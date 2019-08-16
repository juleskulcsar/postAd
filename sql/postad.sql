DROP TABLE IF EXISTS ads CASCADE;

CREATE TABLE ads (
    ad_id SERIAL primary key,
    user_id INT NOT NULL REFERENCES users(id),
    title text,
    description VARCHAR(1500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL primary key,
    first VARCHAR(255),
    last VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password text,
    registeras VARCHAR(255),
    url VARCHAR(255),
    bio text,
    location text,
    skills VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE posts (
    post_id SERIAL primary key,
    user_id INT NOT NULL REFERENCES users(id),
    post_url VARCHAR(255),
    title VARCHAR(255),
    description text,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


DROP TABLE IF EXISTS privatechat CASCADE;

CREATE TABLE privatechat (
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id),
    receiver_id INT REFERENCES users(id),
    message VARCHAR(1000),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS favorites CASCADE;

CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id),
    fav_id INT NOT NULL REFERENCES ads(ad_id),
    favorized BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
