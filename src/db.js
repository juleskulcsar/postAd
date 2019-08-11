let spicedPg = require("spiced-pg");
let db;

if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    db = spicedPg("postgres:postgres:postgres@localhost:5432/socialnetwork");
}

exports.addUserInfo = function addUserInfo(first, last, email, password) {
    return db.query(
        `INSERT INTO users(first, last, email, password) VALUES($1, $2, $3, $4) RETURNING id`,
        [first, last, email, password]
    );
};

exports.getUser = function getUser(email) {
    return db.query(`SELECT * FROM users WHERE email=$1`, [email]);
};

exports.getUserById = function getUserById(id) {
    return db.query(
        `SELECT id, first, last, image, bio FROM users WHERE id=$1`,
        [id]
    );
};

exports.addImage = function addImage(image, id) {
    return db.query(`UPDATE users SET image = $1 WHERE id = $2 RETURNING *`, [
        image,
        id
    ]);
};

exports.addBio = function addBio(bio, id) {
    return db.query(`UPDATE users SET bio = $1 WHERE id = $2 RETURNING bio`, [
        bio,
        id
    ]);
};

exports.searchUsers = function searchUsers(val) {
    return db.query(
        `SELECT id, first, last, image FROM users WHERE first ILIKE $1;`,
        [val + "%"]
    );
};

exports.getRecentUsers = function getRecentUsers() {
    return db.query(
        `SELECT id, first, last, image, bio FROM users ORDER BY created_at DESC LIMIT 3`
    );
};

exports.getFriendships = function getFriendships(sender_id, receiver_id) {
    return db.query(
        `SELECT * FROM friendships
        WHERE (sender_id = $1 AND receiver_id = $2)
        OR (sender_id = $2 AND receiver_id = $1)`,
        [sender_id, receiver_id]
    );
};

exports.addFriendship = function addFriendship(sender_id, receiver_id) {
    return db.query(
        `INSERT into friendships(sender_id, receiver_id)
        VALUES ($1, $2)
        RETURNING *`,
        [sender_id, receiver_id]
    );
};

exports.acceptFriendship = function acceptFriendship(sender_id, receiver_id) {
    return db.query(
        `UPDATE friendships
        SET accepted = true
        WHERE sender_id = $2 AND receiver_id = $1
        RETURNING accepted
        `,
        [sender_id, receiver_id]
    );
};

exports.cancelFriendship = function cancelFriendship(sender_id, receiver_id) {
    return db.query(
        `DELETE FROM friendships
        WHERE (sender_id = $1 AND receiver_id = $2)
        OR (sender_id = $2 AND receiver_id = $1)`,
        [sender_id, receiver_id]
    );
};

exports.friendsWannabes = function friendsWannabes(id) {
    return db.query(
        `SELECT users.id, first, last, image, accepted
        FROM friendships
        JOIN users
        ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
        OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
        OR (accepted = true AND sender_id = $1 AND receiver_id = users.id)`,
        [id]
    );
};

exports.saveMessage = function saveMessage(sender_id, message) {
    return db.query(
        `INSERT INTO chats (sender_id, message)
        VALUES ($1, $2)
        RETURNING *`,
        [sender_id, message]
    );
};

exports.lastTenMessages = function lastTenMessages() {
    return db.query(
        `SELECT chats.id, users.id as user_id, first, last, image, message, chats.created_at
        FROM chats
        LEFT JOIN users
        ON users.id = chats.sender_id
        ORDER BY chats.created_at DESC
        LIMIT 10`
    );
};
