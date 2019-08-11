let spicedPg = require("spiced-pg");
let db;

if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    db = spicedPg("postgres:postgres:postgres@localhost:5432/postad");
}

exports.addUserInfo = function addUserInfo(
    first,
    last,
    email,
    password,
    registeras
) {
    return db.query(
        "INSERT INTO users(first, last, email, password, registeras) VALUES($1, $2, $3, $4, $5) RETURNING *",
        [first, last, email, password, registeras]
    );
};

exports.getUser = function getUser(email) {
    return db.query(`SELECT * FROM users WHERE email=$1`, [email]);
};

exports.getUserById = function getUserById(id) {
    return db.query(
        `SELECT id, first, last, email, registeras, url, bio, location, skills FROM users WHERE id = $1`,
        [id]
    );
};

exports.updateImage = function updateImage(url, id) {
    return db.query(`UPDATE users SET url = $1 WHERE id = $2 RETURNING *`, [
        url,
        id
    ]);
};

exports.updateProfile = function updateProfile(bio, location, skills, id) {
    return db.query(
        `UPDATE users SET bio = $1, location = $2, skills =$3 WHERE id = $4 RETURNING *`,
        [bio, location, skills, id]
    );
};

// exports.updateLocation = function updateBio(location, id) {
//     return db.query(
//         `UPDATE users SET location = $1 WHERE id = $2 RETURNING location`,
//         [location, id]
//     );
// };
