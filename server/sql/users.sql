CREATE TABLE users (
    user_id UUID DEFAULT uuid_generate_v4(),
    password TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    PRIMARY KEY (user_id)
);