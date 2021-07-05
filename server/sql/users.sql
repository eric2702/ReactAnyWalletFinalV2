CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    name TEXT NOT NULL
);