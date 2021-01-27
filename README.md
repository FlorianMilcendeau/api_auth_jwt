# Node.js / Express authentication Json Web Token

## Technologies
- [jest](https://jestjs.io/)
- [Node JS](https://nodejs.org)
- [superTest](https://www.npmjs.com/package/supertest)
- [Express JS](https://www.npmjs.com/package/supertest)
- [Mysql](https://www.mysql.com)
  
## Usage

### Authentication

### Register

**POST** request to: `http://localhost:8000/api/auth/signUp`

```json
{
    "name": String,
    "email": String,
    "password": String,
    "city": String
}
```

`firtname`, `email`, `password` is **REQUIRED**

`city` is **OPTIONAL**

**RESPONSE**

Code server **`201`**

```json
{
    "success": boolean,
    "user": {
        "id": Number,
        "name": String,
        "city": String
    }
    "token": {
        "jwt": String,
        "expiresIn": Number|String
    }
}
```

Code server **`422`**

```json
{
    "errors": [
        {
            "value": String,
            "msg": String,
            "param": String,
            "location": String
        }
    ]
}
```

Code server **`401`**

```json
{
    "success": boolean,
    "message": String
}
```

Code server **`400`**

```json
{
    "success": boolean,
    "message": String
}
```

### Login

**POST** request to: `http://localhost:8000/api/auth/signIn`

```json
{
    "email": String,
    "password": String,
}
```

`email`, `password` is **REQUIRED**

**RESPONSE**

Code server **`200`**

```json
{
    "success": boolean,
    "user": {
        "id": Number,
        "name": String,
        "city": String
    }
    "token": {
        "jwt": String,
        "expiresIn": Number|String
    }
}
```

Code server **422**

```json
{
    "errors": [
        {
            "value": String,
            "msg": String,
            "param": String,
            "location": String
        }
    ]
}
```

Code server **401**

```json
{
    "success": boolean,
    "message": String
}
```
