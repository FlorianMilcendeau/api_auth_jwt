require('dotenv').config();
const request = require('supertest');

const app = require('../../app');
const extention = require('../jest.extends.js');

// custom test extension.
expect.extend(extention);

describe('Route authentication', () => {

  /** Fiels no provided. */
  it('POST /api/authenticate/sign-in - ERROR (field(s) no provided)', (done) => {
    request(app)
      .post('/api/authenticate/sign-in')
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
  it('POST /api/authenticate/sign-in - ERROR (No account)', (done) => {
    const user = { email: 'john@test.com', password: 'hello world' };

    request(app)
      .post('/api/authenticate/sign-in')
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
  it('POST /api/authenticate/sign-in - ERROR (password incorrect)', (done) => {
    const user = { email: 'John@Doe.com', password: 'hello world' };

    request(app)
      .post('/api/authenticate/sign-in')
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
  it('POST /api/authenticate/sign-in - OK (User has been connected)', (done) => {
    const user = { email: 'John@Doe.com', password: 'JohnDoe_jwt' };

    request(app)
      .post('/api/authenticate/sign-in')
      .send(user)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toEqual({
          success: true,
          user: {
            id: expect.any(Number),
            name: 'John',
            email: 'John@Doe.com',
            is_admin: expect.any(Boolean)
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
});
