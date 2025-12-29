# Module 1 : Project Setup
## 1.1 Installing Required Dependencies
- `npm install`
- `npm install npm install @radix-ui/react-select bcrypt bcryptjs cloudinary cookie-parser cors dayjs dotenv express jsonwebtoken mongoose mongoose-aggregate-paginate-v2 multer prettier`

    ***package.json*** looks like this:
    ```javascript
    "dependencies": {
        "@radix-ui/react-select": "^2.2.6",
        "bcrypt": "^6.0.0",
        "bcryptjs": "^3.0.3",
        "cloudinary": "^2.8.0",
        "cookie-parser": "^1.4.7",
        "cors": "^2.8.5",
        "dayjs": "^1.11.19",
        "dotenv": "^17.2.3",
        "express": "^5.2.1",
        "jsonwebtoken": "^9.0.3",
        "mongoose": "^9.0.2",
        "mongoose-aggregate-paginate-v2": "^1.1.4",
        "multer": "^2.0.2",
        "prettier": "^3.7.4"
    },

    "devDependencies": {
        "nodemon": "^3.1.11"
    }
    ```
- `mkdir src public`
- `touch .gitignore .prettierignore .prettierrc .env`

## 1.2 Configuration & Code Consistency
*(These files will help you build your project with code consistency, project security, and streamline team collaboration.)*
### 1.2.1 Prettier
It automates code formatting, which ensures a consistent style across an entire project, increases team productivity, and ends time-consuming debates over minor style choices.

***.prettierrc***
```
{
    "singleQuote": false,
    "bracketSpacing": true,
    "tabWidth": 2,
    "trailingComma": "es5",
    "semi": true
}
```

***.prettierignore***
```
/.vscode
/node_modules
./dist

*.env
.env
.env.*
```

### 1.2.2 *.gitignore*
It tells Git to stop tracking specific, often unnecessary or sensitive files, which keeps your repository clean, secure, efficient, and collaborative

*Note:* This file can be generated from [mrkandreev](https://mrkandreev.name/snippets/gitignore-generator/).

### 1.2.3 .env
This file is crucial for managing environment variables, separating sensitive data (API keys, database credentials) and configuration settings from your codebase, which boosts security, allows easy changes across different environments (dev, staging, production) without code edits, and keeps projects portable, making it essential for modern, scalable applications.

### After following these steps, this is how my file structure looks like: 
![image](https://raw.githubusercontent.com/AvNiVaTs/expense_and_vendor_payment_platform_backend/refs/heads/main/public/Screenshot%202025-12-22%20223315.png)

***Note:*** To learn how to make a good `README.md`, you can visit:
[https://www.geeksforgeeks.org/git/what-is-readme-md-file/](https://www.geeksforgeeks.org/git/what-is-readme-md-file/)

## 1.3 Set Development Commands
Ask yourself:
- *Are you building a backend that changes often during development?*
- *Are you using environment variables properly?*
- *Are you tired of restarting the server manually?*

If yes, this script is useful.

Inside ***package.json***:
```
"scripts": {
    "dev": "nodemon -r dotenv/config src/server.js",
    "start": "node src/server.js"
}
```
- `dev` → local development
- `start` → production

### Why needed?
1. `nodemon`
    - Automatically restarts your server when files change.
    - Without it, you restart the server manually every time you edit code.

2. `-r dotenv/config`
    - Loads environment variables from .env before your app runs.
    - That means process.env.DB_URL, JWT_SECRET, etc. are available immediately.
    - Without this, you either:
        - Hardcode secrets (bad)
        - Forget to load env vars and get runtime errors (common rookie mistake)

3. `src/server.js`
    Entry point of your backend.

# Module 2 : Express Server & MongoDB Connection

## 2.1 Undersanding Node.js Module Systems
There are 2 module systems in Node.js:

### 2.1.1 CommonJS (CJS)
The original Node.js module system.
```javascript
const express = require("express");
module.exports = app;
```

**How it works**
- Synchronous loading
- Node-specific
- Runtime resolution
- Designed before modern JS standards existed

**Use:** In ***package.json*** set: `"type": "commonjs"`

### 2.1.2 ES Modules (ESM)
The official JavaScript standard.
```javascript
import express from "express";
export default app;
```

**How it works**
- Asynchronous loading
- Standardized by ECMAScript
- Static analysis possible (tree-shaking, better tooling)
- Works in browsers and Node

**Use:** In ***package.json*** set: `"type": "module"`


***Note:*** Here, we will be using ESM system.

## 2.2 Application Entry Flow (IMPORTANT)

Your backend does NOT start directly from Express.
It follows a clean, scalable boot sequence.

**Execution Order**
```
server.js
  └── loads environment variables
  └── connects to MongoDB
  └── starts Express server
```

This is how real backends work.

### Understanding File Responsibilities

Each file has ONE job. If a file does multiple jobs, your design is weak.
| File           | Responsibility                            |
| -------------- | ----------------------------------------- |
| `server.js`    | Bootstraps the app (startup logic)        |
| `app.js`       | Configures Express (middlewares + routes) |
| `db/index.js`  | Connects to MongoDB                       |
| `constants.js` | Stores constants used across the app      |
| `.env`         | Holds secrets and environment config      |


## 2.3 Creating Server

### 2.3.1 `server.js`
```javascript
// Load environment variables from .env file
// Without this, process.env will be undefined
import dotenv from "dotenv";

// Import MongoDB connection logic
// This keeps DB code separate from server startup logic
import connectDB from "./db/index.js";

// Import the configured Express app (middlewares + routes)
// NOTE: app.js does NOT start the server
import { app } from "./app.js";

// Explicitly load environment variables
// Using path avoids ambiguity in complex project structures
dotenv.config({
  path: "./env",
});

// Connect to MongoDB FIRST
// Server should only start if DB connection is successful
connectDB()
  .then(() => {
    // Start the Express server only after DB is connected
    app.listen(process.env.PORT || 8000, () => {
      // Using env PORT for flexibility (dev, staging, prod)
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    // If DB connection fails, server should not run
    // Failing fast is better than running a broken app
    console.log("MONGODB Connection failed !!!", err);
  });
```
### 2.3.2 `app.js`
```javascript
// Import Express framework
import express from "express";

// CORS middleware to control cross-origin requests
import cors from "cors";

// Cookie parser to read cookies from incoming requests
import cookieParser from "cookie-parser";

// Create an Express application instance
// This represents your backend application
const app = express();

// Enable CORS with controlled origin
// Prevents unauthorized frontends from accessing backend
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // allowed frontend origin
    credentials: true, // allow cookies & auth headers
  })
);

// Parse incoming JSON payloads
// Limit size to prevent large payload attacks
app.use(express.json({ limit: "16kb" }));

// Parse URL-encoded data (form submissions)
// extended: true allows nested objects
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serve static files from public folder
// Used for images, uploads, PDFs, etc.
app.use(express.static("public"));

// Parse cookies from request headers
// Required for authentication using cookies (JWT, sessions)
app.use(cookieParser());

// Health check route
// Used to verify server status (monitoring, debugging)
app.get("/", (req, res) => {
  res.send({
    activeStatus: "Server is running",
    error: false,
  });
});

// Export the app
// server.js will import this and start listening
export { app };
```

### 2.3.3 `.env`
- `PORT` on which server will run
```
PORT = 8000
```
- MongoDB connection URL (without DB name)
- DB name is appended in code for flexibility
```
MONGODB_URI = enter your url here
```

### 2.3.4 `constants.js`
- Central place to store constant values
- Prevents hardcoding values across the codebase
- Keeps configuration clean and maintainable
```javascript
export const DB_NAME = "enter db name of your choice";
```

### 2.3.5 `db/index.js`
```javascript
// Import mongoose for MongoDB interaction
import mongoose from "mongoose";

// Import database name from constants
// Keeps DB name consistent and easy to change
import { DB_NAME } from "../constants.js";

// Function to connect to MongoDB
// Exported so server.js can control when connection happens
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB
    // Connection string is taken from environment variables
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );

    // Log successful connection
    // Useful for debugging deployment issues
    console.log(
      `MongoDB connected !! DB Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    // Log connection error
    console.log("MONGODB connection error", error);

    // Exit the process if DB connection fails
    // Prevents server from running in broken state
    process.exit(1);
  }
};

// Export the connection function
export default connectDB;

```

## 2.4 Run & Test your server
- `npm run dev`

***On Bash:***
```javascript
$ npm run dev

> nodemon -r dotenv/config src/server.js

[nodemon] 3.1.11
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node -r dotenv/config src/server.js`
[dotenv@17.2.3] injecting env (0) from env -- tip: 👥 sync secrets across teammates & machines: https://dotenvx.com/ops

 MongoDB connected !! DB Host: **-*******-*****-00-00.*******.mongodb.net
Server is running on port 8000
```
*(DB Host is made hidden intentionally)*

# Module 3: Data Modelling
up next.....