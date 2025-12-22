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

# Module 2 : Creating Node.js Server
up next.....
