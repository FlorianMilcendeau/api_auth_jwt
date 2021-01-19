# Node.js / Express authentication Json Web Token

## Table of Contents

- [Overview](#overview)
  - [Built With](#built-with)
- [Architecture](#Architecture)
- [Usage](#Usage)
  - [Authentication](#Authentication)
    - [Register](#Register)
    - [Login](#Login)
- [Contact](#contact)

# Architecture

This api provides:

- Folders:
  - `config`:
    - `connection.js` connection to the mySQL database.
  - `controllers`:
    - `authenticate.js` routes signIn signUp.
  - `middlewares`:
    - `verifyToken.js` check if the token is valid.
    - `verifyBody.js` check if the form signUp or signIn is valid.
  - models:
    - `CrudDao.js` model crudDao.
    - `User.js` model user.
- `dotenv` env file:
  - PORT
  - DB_HOST
  - DB_NAME
  - DB_USER
  - DB_PASSWORD
- ESLint with Airbnb rules
- Prettier

# Usage

<ol>
  <li>Install dependencies: `npm install` (alternatively, you can use Yarn or NPM)</li>
  <li>Start the app on your local machine: `npm run start:dev</li>
</ol>

## Authentication

### Register

**POST** request to: `http://localhost:8000/api/auth/signUp`

```
{
    name: String,
    email: String,
    password: String,
    city: String
}
```

`firtname`, `email`, `password` are **REQUIRED**  
`city` is **OPTIONAL**

**RESPONSE**

Code server **201**

```
{
    success: true,
    user: {
        id: Number,
        name: String,
        city: String
    }
    token: {
        jwt: String,
        expiresIn: Number|String
    }
}
```

### Login

**POST** request to: `http://localhost:8000/api/auth/signIn`

```
{
    email: String,
    password: String,
}
```

`email`, `password` are **REQUIRED**`

**RESPONSE**

Code server **200**

```
{
    success: true,
    user: {
        id: Number,
        firstname: String,
        city: String
    }
    token: {
        jwt: String,
        expiresIn: Number|String
    }
}
```
