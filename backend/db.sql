-- Example SQL schema for a typical backend project
-- Adjust table and column names as per your actual project requirements

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notes table
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Example: Insert initial admin user (change values as needed)
INSERT INTO users (username, email, password_hash)
VALUES ('admin', 'admin@example.com', 'your_password_hash_here');

-- Example: Insert a sample note
INSERT INTO notes (user_id, title, content)
VALUES (1, 'Welcome Note', 'This is your first note.');

-- Add more tables and relationships as needed for your project