# Back-end

The backend has been written with NestJS, a very complete framework for developping web applications.

The servers listens on port 8080 by default or, if defined, on the `PORT` environment variable.

The server also includes a Swagger documentation, documenting all routes and their parameters, body and response format, running on the "/docs" route.

To run the `/transformData` part, the data.json should be placed in the "back-end" folder.

Recipes data are saved in a SQLite file, stored as `data.db` in the root of the server.

## Install & run

To install dependencies, run `npm i` at the root of the server.

To start the server, run `npm run start` at the root of the server.

To start unit tests and coverage test, run `npm run test:cov` at the root of the server.