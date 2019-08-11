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
// const csurf = require("csurf");
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

// app.use(csurf());
// app.use(function(req, res, next) {
//     res.cookie("mytoken", req.csrfToken());
//     next();
// });

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
        console.log("addUserInfo returns: ", id);
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
        if (user.rows[0].url === null) {
            user.rows[0].url = "/default.png";
        }
        console.log("what is this? ", user.rows[0]);
        res.json(user.rows[0]);
    } catch (err) {
        console.log("error in get /profile: ", err);
    }
});

app.post("/description", async (req, res) => {
    try {
        console.log("req.body: ", req.body);
        await db.updateProfile(
            req.body.bio,
            req.body.location,
            req.body.skills,
            req.session.userId
        );

        res.json(req.body);
    } catch (err) {
        console.log("err in post /description: ", err);
    }
});

// app.get("/profile/:id.json", async (req, res) => {
//     try {
//         const { id } = req.params;
//         if (id == req.session.userId) {
//             res.json({
//                 error: true,
//                 sameUser: true
//             });
//         }
//         const results = await db.getUserById(id);
//         res.json(results.rows[0]);
//     } catch (err) {
//         console.log("error in get profile/:id: ", err);
//     }
// });
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
//logout
app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});

//keep this last
app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function() {
    console.log("BAM BAM! Final Project set in motion!");
});
