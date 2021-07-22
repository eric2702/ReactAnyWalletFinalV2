CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name TEXT NOT NULL
);

INSERT INTO categories (category_name)
VALUES ('Income'), ('Expense');