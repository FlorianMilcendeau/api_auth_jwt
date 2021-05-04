require('dotenv').config();
const request = require('supertest');

const app = require('../../app');
const extention = require('../jest.extends');

// custom test extension.
expect.extend(extention);

describe('Route authentication', () => {

  it('POST /api/authenticate/sign-up - ERROR (field(s) no provided)', (done) => {
    request(app)
      .post('/api/authenticate/sign-up')
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
  it('POST /api/authenticate/sign-up - ERROR (Account already exist)', (done) => {
    const user = {
      name: 'Hello',
      email: 'Hello@World.com',
      password: 'JohnDoe_jwt',
    };

    request(app)
      .post('/api/authenticate/sign-up')
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
  it('POST /api/authenticate/sign-up - OK (User has been created)', (done) => {
    const user = {
      name: 'Foo',
      email: 'Foo@Bar.com',
      password: 'FooBar_jwt',
    };

    request(app)
      .post('/api/authenticate/sign-up')
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
