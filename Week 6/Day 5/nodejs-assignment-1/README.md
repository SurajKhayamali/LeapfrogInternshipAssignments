# Project API Documentation

This project provides a RESTful API for managing todos and user authentication. Below are the available endpoints:

## Authentication Endpoints

- `POST /auth/signup`: Endpoint for user registration.
- `POST /auth/login`: Endpoint for user login.
- `POST /auth/refresh`: Endpoint for refreshing user access tokens.
- `POST /auth/logout`: Endpoint for user logout.

## Todo Endpoints

- `POST /todos`: Create a new todo. The request body should be a JSON object with a [`title`](./src/interfaces/todo.interface.ts) property.
- `GET /todos`: Get all todos. This endpoint also supports query parameters for filtering todos. For example, `GET /todos?searchTerm=learning` will return todos that match the search term, and `GET /todos?completed=true` will return completed todos.
- `GET /todos/:id`: Get a specific todo by its ID.
- `PATCH /todos/:id`: Update a specific todo by its ID. The request body should be a JSON object with the properties to be updated.
- `PATCH /todos/:id/complete`: Mark a specific todo as completed.
- `PATCH /todos/:id/uncomplete`: Mark a specific todo as not completed.
- `DELETE /todos/:id`: Delete a specific todo by its ID.

For more details on how to use these endpoints, please refer to the source code in the [`src/routes`](./src/routes) directory and the [`src/controllers`](./src/controllers) directory.