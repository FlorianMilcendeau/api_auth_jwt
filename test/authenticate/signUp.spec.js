require('dotenv').config();
const request = require('supertest');

const app = require('../../app');
const connection = require('../../config/connection');
const User = require('../../models/User');
const generatePassword = require('../../utils/password');
const extention = require('../jest.extends');

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
        const hash = await generatePassword('HelloWorld');

        await User.create({
          name: 'Hello',
          email: 'Hello@World.com',
          password: hash,
        });

        done();
      }
    );
  });

  it('POST /api/auth/signUp - ERROR (field(s) no provided)', (done) => {
    request(app)
      .post('/api/auth/signUp')
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

  /** Account already exist. */
  it('POST /api/auth/signUp - ERROR (Account already exist)', (done) => {
    const user = {
      name: 'Hello',
      email: 'Hello@World.com',
      password: 'JohnDoe_jwt',
    };

    request(app)
      .post('/api/auth/signUp')
      .send(user)
      .expect(401)
      .expect('Content-Type', /json/)
      .then((res) => {
        const expected = {
          success: false,
          message: 'Account already exist',
        };

        expect(res.body).toEqual(expected);
        done();
      })
      .catch((err) => done(err));
  });

  /** User has been created. */
  it('POST /api/auth/signUp - OK (User has been created)', (done) => {
    const user = {
      name: 'Foo',
      email: 'Foo@Bar.com',
      password: 'FooBar_jwt',
    };

    request(app)
      .post('/api/auth/signUp')
      .send(user)
      .expect(201)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toEqual({
          success: true,
          user: {
            id: expect.any(Number),
            name: 'Foo',
            email: 'Foo@Bar.com',
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
