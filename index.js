const express = require('express');
const app = express();
const compression = require('compression');

app.use(compression());

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.post("/advertize", async (req, res) => {
    const { title, description } = req.body;

    try {

        let id = await db.addAdInfo(title, description);
        // req.session.userId = id.rows[0].id;
        res.json({ success: true });
    } catch (err) {
        console.log("err in POST /advertize", err);
    }
});

// app.get("/ads", async (req, res) => {
//     try {
//         let ad = await db.getAdById(req.session.userId);
//         // user = user.rows[0];
//         // console.log("user:", user.rows[0]);
//
//         if (user.rows[0].image === null) {
//             user.rows[0].image = "/images/default-copy.png";
//         }
//         // console.log("USER.ROWS[0]:", user.rows[0]);
//         // console.log("USER URL:", user.rows[0].image);
//         res.json(user.rows[0]);
//     } catch (err) {
//         console.log("err in GET / ads", err);
//     }
// });

// app.post("/advertize", async (req, res) => {
//     try {
//         await db.addAd(req.body.title, req.body.description);
//         res.json(req.body);
//     } catch (err) {
//         console.log("err in POST / description", err);
//     }
// });

// app.get("/user/:id.json", async (req, res) => {
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
//         console.log("err in GET / user/:id.json", err);
//     }
// });


//________________________________________________
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
//________________________________________________
app.listen(8080, function() {
    console.log("I'm listening.");
});
