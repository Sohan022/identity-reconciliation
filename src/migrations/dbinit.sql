CREATE TABLE contact (
    id SERIAL PRIMARY KEY,
    email TEXT,
    phone_number TEXT,
    linked_id INTEGER,
    link_precedence TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP
);