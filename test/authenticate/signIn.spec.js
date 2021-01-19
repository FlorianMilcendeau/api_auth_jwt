require('dotenv').config();
const request = require('supertest');

const app = require('../../app');
const connection = require('../../config/connection');
const User = require('../../models/User');
const generatePassword = require('../../utils/password');
const extention = require('../jest.extends.js');

// custom test extension.
expect.extend(extention);

describe('Route authentication', () => {
  // I truncate all initiator table then I create new user.
  beforeAll((done) => {
    connection.query(
      `SET FOREIGN_KEY_CHECKS = 0; TRUNCATE TABLE initiator; SET FOREIGN_KEY_CHECKS = 1`,
      async (err) => {
        if (err) {
          console.error(err);
        }
        const hash = await generatePassword('JohnDoe_jwt');

        await User.create({
          firstname: 'John',
          email: 'John@Doe.com',
          password: hash,
        });

        done();
      }
    );
  });

  /** Fiels no provided. */
  it('POST /api/auth/signIn - ERROR (field(s) no provided)', (done) => {
    request(app)
      .post('/api/auth/signIn')
      .send({})
      .expect(422)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toEqual({
          errors: expect.arrayContaining([
            expect.objectContaining({
              msg: expect.any(String),
            }),
          ]),
        });

        done();
      });
  });

  /** Account not found. */
  it('POST /api/auth/signIn - ERROR (No account)', (done) => {
    const user = { email: 'john@test.com', password: 'johnDoe_jwt' };

    request(app)
      .post('/api/auth/signIn')
      .send(user)
      .expect(401)
      .expect('Content-Type', /json/)
      .then((res) => {
        const expected = { success: false, message: 'Account does not exist' };

        expect(res.body).toEqual(expected);
        done();
      })
      .catch((err) => done(err));
  });

  /** Password incorrect. */
  it('POST /api/auth/signIn - ERROR (password incorrect)', (done) => {
    const user = { email: 'John@Doe.com', password: 'johnDoejwt' };

    request(app)
      .post('/api/auth/signIn')
      .send(user)
      .expect(401)
      .expect('Content-Type', /json/)
      .then((res) => {
        const expected = { success: false, message: 'Password incorrect' };

        expect(res.body).toEqual(expected);
        done();
      })
      .catch((err) => done(err));
  });

  /** User has been connected */
  it('POST /api/auth/signIn - OK (User has been connected)', (done) => {
    const user = { email: 'John@Doe.com', password: 'JohnDoe_jwt' };

    request(app)
      .post('/api/auth/signIn')
      .send(user)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toEqual({
          success: true,
          user: {
            id: expect.any(Number),
            firstname: 'John',
            email: 'John@Doe.com',
            city: expect.toBeStringOrNull(),
          },
          token: {
            jwt: expect.stringMatching(new RegExp(/(Bearer)\s+(\S+)/, 'i')),
            expiresIn: expect.any(Number),
          },
        });
        done();
      })
      .catch((err) => done(err));
  });

  afterAll(() => connection.end());
});
