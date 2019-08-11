DROP TABLE IF EXISTS ads;

CREATE TABLE ads (
    ad_id SERIAL primary key,
    title text,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
