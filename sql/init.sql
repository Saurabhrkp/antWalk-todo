CREATE TABLE todosapp.users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    magic_link_token VARCHAR(255),
    token_expiry TIMESTAMP
);

CREATE TABLE todosapp.todos (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES todosapp.users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);