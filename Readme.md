App.js --

The code sets up an Express server for a Node.js application and connects it to a MongoDB database. The necessary modules are imported, and an instance of the Express app is created. The `port` constant is set to 5000.

The `cors` and `compression` middleware are imported and used by the app. The `compression` middleware is used to compress response data to improve performance. The `cors` middleware is used to handle Cross-Origin Resource Sharing (CORS), allowing requests from any origin by setting `origin` to `"*"`.

The app is configured to use the `express.json()` middleware to parse incoming JSON request data. The `/api/auth` route is configured to use the router defined in `./routes/auth.js`.

The app listens on the specified port, and a message is logged to the console to indicate the server has started. The `connectToMongo` function is called to establish a connection to the MongoDB database.


auth.js --

The code defines an Express router for handling user-related routes in a Node.js application. It imports the necessary modules and defines the following routes:

1. POST `/createuser`: This route handles user registration. It uses `express-validator` middleware to validate the user input (email, name, and password). If there are any validation errors, it responds with a 400 status and the list of errors. If the input is valid, it checks if a user with the given email already exists. If so, it responds with a 400 status and an error message. If the user doesn't exist, it creates a new user with the hashed password and saves it to the database. It then generates a JWT token and sends it as a response along with the user's resume.

2. POST `/login`: This route handles user login. It validates the email and password input using `express-validator`. If there are validation errors, it responds with a 400 status and the list of errors. If the input is valid, it checks if a user with the given email exists. If not, it responds with a 400 status and an error message. If the user exists, it compares the provided password with the stored hashed password. If the passwords match, it generates a JWT token and sends it as a response along with the user's resume.

3. POST `/getuser`: This route is for fetching user details. It uses the `fetchUser` middleware to authenticate the user. If the user is authenticated, it retrieves their details from the database (excluding the password) and sends them as a response.

The `JWT_SECRET` constant is used as the secret for signing and verifying JWT tokens. The router is exported for use in other parts of the application.

Note: It's important to keep sensitive information like the `JWT_SECRET` in environment variables rather than hardcoding them in the code. Use the `dotenv` package to load the secret from a `.env` file, and make sure not to commit the `.env` file to version control.

User.js --

The code defines a Mongoose schema and model for a User in a MongoDB database. First, the `mongoose` module is imported, and the `Schema` object is extracted from it.

A new schema, `UserSchema`, is created with the following fields:

- `name`: a required string
- `email`: a required and unique string
- `password`: a required string
- `resume`: a required string
- `date`: a date with a default value set to the current date and time (`Date.now`)

A Mongoose model called `User` is created based on the `UserSchema` and associated with the 'user' collection in the MongoDB database. The `createIndexes` method is called on the `User` model to ensure that indexes are created for the fields marked as unique.

Finally, the `User` model is exported for use in other parts of the application.

fetchUser.js --

This code defines a middleware function called `fetchUser` for Express.js that verifies and decodes a JSON Web Token (JWT) sent in the request header. The `jsonwebtoken` module is imported, and a JWT secret string is defined as `JWT_SECRET`.

The `fetchUser` function accepts three arguments: `req` (request), `res` (response), and `next` (a callback function to call the next middleware). 

The function first checks if the request header contains an 'auth-token'. If not, it sends a 401 status response with an error message indicating that authentication is required.

If the 'auth-token' is present, the function tries to verify and decode the JWT using the `jwt.verify()` method with the provided token and `JWT_SECRET`. If the token is valid, the decoded user data is assigned to `req.user`, and the `next()` function is called to continue processing the request with the next middleware in the chain.

If there is an error in the token verification process (e.g., the token is invalid or expired), the function sends a 401 status response with an error message indicating that a valid token is required for authentication.

Finally, the `fetchUser` middleware function is exported for use in other parts of the application.

To Run This Server Application --

You Need To Install Node.js In Your System

Run -> npm i

Run -> npm run dev