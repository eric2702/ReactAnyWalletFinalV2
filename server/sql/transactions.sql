CREATE TABLE transactions (
    transaction_id UUID DEFAULT uuid_generate_v4(),
    details TEXT,
    nominal BIGINT NOT NULL,
    date_created_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    category_id SERIAL REFERENCES categories(category_id),
    user_id UUID REFERENCES users(user_id),
    PRIMARY KEY (transaction_id)
);