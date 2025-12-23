# Module 1 : Project Setup
### 1.1 Installing Required Dependencies
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

### 1.2 Enter content in files
*(These files will help you build your project with code consistency, project security, and streamline team collaboration.)*
#### 1.2.1 Prettier
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

#### 1.2.2 *.gitignore*
It tells Git to stop tracking specific, often unnecessary or sensitive files, which keeps your repository clean, secure, efficient, and collaborative

*Note:* This file can be generated from [mrkandreev](https://mrkandreev.name/snippets/gitignore-generator/).

#### 1.2.3 .env
This file is crucial for managing environment variables, separating sensitive data (API keys, database credentials) and configuration settings from your codebase, which boosts security, allows easy changes across different environments (dev, staging, production) without code edits, and keeps projects portable, making it essential for modern, scalable applications.

#### After following these steps, this is how my file structure looks like: 
![image](https://raw.githubusercontent.com/AvNiVaTs/expense_and_vendor_payment_platform_backend/refs/heads/main/public/Screenshot%202025-12-22%20223315.png)

***Note:*** To learn how to make a good `README.md`, you can visit:
[https://www.geeksforgeeks.org/git/what-is-readme-md-file/](https://www.geeksforgeeks.org/git/what-is-readme-md-file/)

### 1.3 Set Development Commands
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

#### Why needed?
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

# Module 2 : Creating Node.js Server & MongoDB Connection

### 2.1 Undersanding Node.js Module Systems
There are 2 module systems in Node.js:

#### 2.1.1 CommonJS (CJS)
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

#### 2.1.2 ES Modules (ESM)
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

### 2.2 Creating Node.js Sever using Express.js
``` javascript
// Import the express module
import express from 'express';
// Create an Express application instance
const app = express();
// Define the port number
const PORT = 8000;

// Define a route for the root URL that handles GET requests
app.get('/', (req, res) => {
    //response back to the client
    res.send("Express Server setup done!");
});

// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
```

***On Bash:***
```javascript
$ npm run dev

[nodemon] 3.1.11
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node -r dotenv/config src/server.js`

Server is running on http://localhost:8000
```

Now each time you do changes, you don't need to run the command again on bash, you can directly see the output.

And if you wish to exit this, press `Ctrl+C`.

### 2.3 MongoDB Connection
