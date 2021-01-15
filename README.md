# Node.js / Express template authentication Json Web Token

This template provides:

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
- Automatic linting on commit: **you can't commit if you have ESLint errors**

## Usage

1. Install dependencies: `npm install` (alternatively, you can use Yarn or PNPM)
2. `.env` adjust it to your needs
3. Start the app on your local machine: `npm run start:dev`
