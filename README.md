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

**POST** request to: `http://localhost:8000/api/authenticate/sign-up`

```
{
    "name": String,
    "email": String,
    "password": String
}
```

`firtname`, `email`, `password` is **REQUIRED**


**RESPONSE**

Code server **`201`**

```
{
    "success": boolean,
    "user": {
        "id": Number,
        "name": String
    }
    "token": {
        "jwt": String,
        "expiresIn": Number|String
    }
}
```

Code server **`422`**

```
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

```
{
    "success": boolean,
    "message": String
}
```

Code server **`400`**

```
{
    "success": boolean,
    "message": String
}
```

### Login

**POST** request to: `http://localhost:8000/api/authenticate/sign-in`

```
{
    "email": String,
    "password": String,
}
```

`email`, `password` is **REQUIRED**

**RESPONSE**

Code server **`200`**

```
{
    "success": boolean,
    "user": {
        "id": Number,
        "name": String
    }
    "token": {
        "jwt": String,
        "expiresIn": Number|String
    }
}
```

Code server **422**

```
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

```
{
    "success": boolean,
    "message": String
}
```
