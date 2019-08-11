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

exports.updateBio = function updateBio(bio, id) {
    return db.query(`UPDATE users SET bio = $1 WHERE id = $2 RETURNING bio`, [
        bio,
        id
    ]);
};
exports.updateSkills = function updatSkills(skills, id) {
    return db.query(
        `UPDATE users SET skills = $1 WHERE id = $2 RETURNING skills`,
        [skills, id]
    );
};
exports.updateLocation = function updatSkills(location, id) {
    return db.query(
        `UPDATE users SET location = $1 WHERE id = $2 RETURNING location`,
        [location, id]
    );
};

//---------all ads stuff -------------------------------------
exports.addAdInfo = function addAdInfo(user_id, title, description) {
    return db.query(
        `INSERT INTO ads(user_id, title, description) VALUES($1, $2, $3) RETURNING *`,
        [user_id, title, description]
    );
};

exports.getAllAds = function getAllAds() {
    return db.query(
        `SELECT users.id, first, last, location, title, description
        FROM ads
        JOIN users
        ON (user_id = users.id)`
    );
};
//---------all ads stuff -------------------------------------
