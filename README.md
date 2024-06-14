# Todo App

## Overview

This is a simple backend for a todo app using Express.js, PostgreSQL, and magic link authentication.

## Setup Instructions

1. Clone the repository
2. Run `npm install` to install dependencies
3. Set up PostgreSQL and run the SQL script in `sql/init.sql`
4. Create a `.env` file with the necessary environment variables
5. Start the server with `npm start`

## API Endpoints

- `POST /auth/register` - Send a magic link to the user's email
- `GET /auth/magic-link` - Verify the magic link token
- `POST /todos` - Create a new todo
- `GET /todos` - Get todos for a user
- `PUT /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo

## Testing

Run `npm test` to execute the test cases.
