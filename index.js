const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./utils/db");
const bcrypt = require("./utils/bc");
const bodyParser = require("body-parser");
var multer = require("multer");
var uidSafe = require("uid-safe");
var path = require("path");
const s3 = require("./s3");
const config = require("./config");
const cookieSession = require("cookie-session");
const moment = require("moment");
//socket.io stuff
const csurf = require("csurf");
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    origins: "localhost:8080 192.168.50.*:*"
});

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.use(compression());
app.use(bodyParser.json());
app.use(express.static("./public"));

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());
app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}
//registration and login
app.get("/welcome", function(req, res) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/signup", async (req, res) => {
    const { first, last, email, password, registeras } = req.body;

    try {
        let hash = await bcrypt.hashPassword(password);
        let id = await db.addUserInfo(first, last, email, hash, registeras);
        req.session.userId = id.rows[0].id;
        // console.log("addUserInfo returns: ", id);
        res.json({ success: true });
    } catch (err) {
        console.log("err in POST /register", err);
    }
});

app.post("/login", (req, res) => {
    db.getUser(req.body.email).then(results => {
        // console.log("post /login:", results);
        if (!results.rows[0]) {
            res.json({
                success: false
            });
        }
        return bcrypt
            .checkPassword(req.body.password, results.rows[0].password)
            .then(matching => {
                // console.log(req.body.pass);
                if (matching === true) {
                    req.session.userId = results.rows[0].id;
                    res.json({
                        success: true
                    });
                } else {
                    res.json({
                        success: false
                    });
                }
            })
            .catch(err => {
                console.log("post /login error ", err);
            });
    });
});
//get the user
app.get("/profile", async (req, res) => {
    try {
        let user = await db.getUserById(req.session.userId);
        // console.log("user in /profile:", user);
        if (user.rows[0].url === null) {
            user.rows[0].url = "/default.jpg";
        }
        console.log("what is this? ", user.rows[0]);
        res.json(user.rows[0]);
    } catch (err) {
        console.log("error in get /profile: ", err);
    }
});

app.post("/bio", async (req, res) => {
    try {
        await db.updateBio(req.body.bio, req.session.userId);
        res.json(req.body.bio);
    } catch (err) {
        console.log("err in post /bio: ", err);
    }
});
app.post("/skills", async (req, res) => {
    try {
        await db.updateSkills(req.body.skills, req.session.userId);
        res.json(req.body.skills);
    } catch (err) {
        console.log("err in post /skills: ", err);
    }
});
app.post("/location", async (req, res) => {
    try {
        await db.updateLocation(req.body.location, req.session.userId);
        res.json(req.body.location);
    } catch (err) {
        console.log("err in post /location: ", err);
    }
});

app.get("/profile/:id.json", async (req, res) => {
    try {
        const { id } = req.params;
        if (id == req.session.userId) {
            res.json({
                error: true,
                sameUser: true
            });
        }
        const results = await db.getUserById(id);
        res.json(results.rows[0]);
    } catch (err) {
        console.log("error in get profile/:id: ", err);
    }
});

//upload new profile image
app.post("/upload", uploader.single("file"), s3.upload, async (req, res) => {
    const url = config.s3Url + req.file.filename;
    try {
        const results = await db.updateImage(url, req.session.userId);
        res.json(results.rows[0].url);
    } catch (err) {
        console.log("error in POST /upload; ", err);
    }
});
//--------------post image upload----------------------
app.post("/post", async (req, res) => {
    const { post_url, title, description } = req.body;

    try {
        let id = await db.addPost(
            req.session.userId,
            post_url,
            title,
            description
        );
        console.log("Id in POST/post:", id);
        // req.session.userId = id.rows[0].id;
        res.json({ success: true });
    } catch (err) {
        console.log("err in POST /post", err);
    }
});
//--------------post image upload----------------------

//----------------get all posts for each profile--------------
app.get("/allposts.json", async (req, res) => {
    try {
        const { rows } = await db.getAllPosts();
        // console.log("wtf is this rows in /allposts.json: ", rows);
        res.json(rows);
    } catch (err) {
        console.log("err in GET /allposts.json: ", err);
    }
});
//----------------get all posts for each profile--------------

//----------------get all favs---------------------------
app.get("/allfavs.json", async (req, res) => {
    try {
        const { rows } = await db.getAllFavs(req.session.userId);
        console.log("wtf is this rows in /allfavs.json: ", rows);
        res.json(rows);
    } catch (err) {
        console.log("err in GET /allfavs.json: ", err);
    }
});
//----------------get all favs---------------------------

//----------get timeline all posts----------------
app.get("/timeline.json", async (req, res) => {
    try {
        const { rows } = await db.getAllPosts();
        // console.log("wtf is this rows in /allposts.json: ", rows);
        res.json(rows);
    } catch (err) {
        console.log("err in GET /timeline.json: ", err);
    }
});
//----------get timeline all posts----------------

app.post(
    "/postimageupload",
    uploader.single("file"),
    s3.upload,
    async (req, res) => {
        const url = config.s3Url + req.file.filename;
        try {
            // const results = await db.updatePostImage(url, req.session.userId);
            // console.log("postimageupload: ", results.rows[0]);
            // res.json(results.rows[0].post_url);
            res.json(url);
        } catch (err) {
            console.log("error in POST /postimageupload; ", err);
        }
    }
);

app.get("/user/:id.json", async (req, res) => {
    try {
        const { id } = req.params;
        if (id == req.session.userId) {
            res.json({
                error: true,
                sameUser: true
            });
        }
        const results = await db.getUserById(id);
        res.json(results.rows[0]);
    } catch (err) {
        console.log("error in get user/:id: ", err);
    }
});

//---------ads wall post stuff----------
//------ insert ads into database
app.post("/ads", async (req, res) => {
    const { title, description } = req.body;
    console.log("REQ BODY in post ads:", req.body);
    try {
        let id = await db.addAdInfo(req.session.userId, title, description);
        let result = await db.getUserById(req.session.userId);
        // console.log("result in POST ADS: ", result.rows);
        // console.log("Id in POST/ads:", id);
        res.json({
            ad_id: id.rows[0].ad_id,
            user_id: id.rows[0].user_id,
            title: id.rows[0].title,
            description: id.rows[0].description,
            first: result.rows[0].first,
            last: result.rows[0].last
        });
    } catch (err) {
        console.log("err in POST /ads", err);
    }
});

app.get("/allads.json", async (req, res) => {
    try {
        const { rows } = await db.getAllAds(req.session.userId);
        // console.log("wtf is this rows in /allads.json: ", rows);
        res.json(rows);
    } catch (err) {
        console.log("err in GET /allads.json: ", err);
    }
});

app.get("/project/:post_id.json", async (req, res) => {
    try {
        const { post_id } = req.params;
        // if (id == req.session.userId) {
        //     res.json({
        //         error: true,
        //         sameUser: true
        //     });
        // }
        const results = await db.getProjectById(post_id);
        // console.log("results in get project by id: ", results.rows);
        res.json(results.rows[0]);
    } catch (err) {
        console.log("error in get project/:id: ", err);
    }
});

//------------------------fav ads ----------------------

app.get("/ads/:fav_id.json", async (req, res) => {
    console.log("req.params.fav_id: ", req.params.fav_id);
    try {
        const results = await db.getFavAdsStatus(
            req.session.userId,
            req.params.fav_id
        );
        if (!results.rows[0]) {
            res.json({
                btnText: "save"
            });
        } else {
            res.json({
                btnText: "remove"
            });
        }
    } catch (err) {
        console.log("err in GET /getFavAdsStatus: ", err);
    }
});

app.post("/ads/:fav_id.json", async (req, res) => {
    console.log("testing req.body in POST ads/: ", req.body);
    try {
        if (req.body.button == "save") {
            console.log("wtf is this fav_id: ", req.params.fav_id);
            await db.saveFavAds(req.session.userId, req.params.fav_id);
            // if (socketsIdMap[req.params.otherProfileId])
            //     socketsIdMap[req.params.otherProfileId].emit(
            //         "new friend request",
            //         {
            //             sender: req.session.userId,
            //             receiver: req.params.otherProfileId
            //         }
            //     );
            res.json({
                btnText: "remove"
            });
        }
    } catch (err) {
        console.log("err in POST /ads/:fav_id ", err);
    }
});

app.post("/adsr/:fav_id.json", async (req, res) => {
    console.log("testing req.body in POST remove ads/: ", req.body);
    try {
        if (req.body.button == "remove") {
            console.log("wtf is this fav_id: ", req.params.fav_id);
            await db.removeFav(req.session.userId, req.params.fav_id);
            res.json({
                btnText: "save"
            });
        }
    } catch (err) {
        console.log("err in POST /adsr/:fav_id ", err);
    }
});

//------------------------fav ads ----------------------

//logout
app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});

//keep this last
app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

let mySocketId;
let onlineUsers = [];
io.on("connection", function(socket) {
    console.log(`a socket with the id ${socket.id} just connected`);
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }

    // onlineUsers[socket.id] = socket.request.session.userId;
    // mySocketId = socket.id;
    const userId = socket.request.session.userId;
    const socketId = socket.id;
    onlineUsers[socketId] = userId;

    onlineUsers.push({
        userId,
        socketId: socket.id
    });
    // onlineUsers.forEach(user => {
    //     io.sockets.sockets[user.socketId].emit();
    // });

    // if (mySocketId) {
    //     io.sockets.sockets[mySocketId].emit("privateChatMessage");
    // }

    // onlineUsers = Object.values(onlineUsers);

    // console.log("online users: ", onlineUsers);

    // const receiver = receiver_id.receiver_id;
    socket.on("allPrivateMessages", receiver_id => {
        // console.log("receiver id for get private messages: ", receiver_id);
        // console.log("msg for get private messages: ", msg);
        db.getPrivateChatMessages(socket.request.session.userId, receiver_id)
            .then(data => {
                for (let i = 0; i < data.rows.length; i++) {
                    data.rows[i].created_at = moment(
                        data.rows[i].created_at,
                        moment.ISO_8601
                    ).format("MMM Do YY");
                }
                // console.log("wtf is this? ", data.rows);
                socket.emit("privateMessages", data.rows.reverse());
            })
            .catch(err => console.log("error in getPrivateMessages", err));
    });

    socket.on("privateMessages", (message, receiver_id) => {
        // console.log("is this id logging? ", receiver_id);
        db.savePrivateChatMessage(
            socket.request.session.userId,
            receiver_id,
            message
        )
            .then(result => {
                console.log("results from save private msg: ", result.rows[0]);
                return db
                    .getUserById(socket.request.session.userId)
                    .then(data => {
                        result.rows[0].created_at = moment(
                            result.rows[0].created_at,
                            moment.ISO_8601
                        ).format("MMM Do YY");
                        data.rows[0].user_id = data.rows[0].id;
                        data.rows[0].id = result.rows[0].id;
                        data.rows[0].message = result.rows[0].message;
                        data.rows[0].created_at = result.rows[0].created_at;
                        data.rows[0].receiver_id = result.rows[0].receiver_id;
                        // socket.emit("privateMessages", data.rows[0]);
                        // if (onlineUsers[socketId] == receiver_id) {
                        //     console.log("again receiver_id: ", receiver_id);
                        //     onlineUsers.forEach(user => {
                        //         io.sockets.sockets[user.socketId].emit(
                        //             "newPrivateMessage",
                        //             data.rows[0]
                        //         );
                        //     });
                        // }
                        // console.log("receiver_id is: ", receiver_id);
                        // console.log("onlineusers: ", onlineUsers);
                        let uniqueUsers = onlineUsers.filter(
                            user => user.userId == receiver_id
                        );
                        // console.log("unique users: ", uniqueUsers);
                        // console.log("uniqueusers: ", uniqueUsers[0].socketId);
                        // console.log("data.rows[0]: ", data.rows[0]);
                        // console.log("mysocket: ", socket.id);
                        for (let i = 0; i < uniqueUsers.length; i++) {
                            io.to(uniqueUsers[i].socketId).emit(
                                "newPrivateMessage",
                                data.rows[0]
                            );
                        }
                        // io.to(uniqueUsers[0].socketId).emit(
                        //     "newPrivateMessage",
                        //     data.rows[0]
                        // );
                        io.to(socket.id).emit(
                            "newPrivateMessage",
                            data.rows[0]
                        );
                        //get the receiver's socket id

                        // if (mySocketId) {
                        //     io.sockets.sockets[mySocketId].emit(
                        //         "privateChatMessage",
                        //         data.rows[0]
                        //     );
                        // }
                    });
            })
            .catch(err =>
                console.log("error in index.js newPrivateMessage: ", err)
            );
    });

    socket.on("disconnect", () => {
        console.log(`a socket with the id ${socket.id} just disconnected`);
    });
}); //closes io.on

server.listen(8080, function() {
    console.log("BAM BAM! Final Project set in motion!");
});

//private messaging
