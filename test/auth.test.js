require('dotenv').config();
const request = require('supertest');
const app = require('../index');

describe('Route authentication', () => {
  it('POST /api/auth/signUp - ERROR (fields no provided)', (done) => {
    request(app)
      .post('/api/auth/signIn')
      .send({})
      .expect(422)
      .expect('Content-Type', /json/)
      .then((res) => {
        const expected = {
          errors: [
            {
              location: 'body',
              msg: 'e-mail is wrong',
              param: 'email',
            },
            {
              location: 'body',
              msg: 'must be at least 8 char long',
              param: 'password',
            },
          ],
        };
        expect(res.body).toEqual(expected);
        done();
      })
      .catch(done);
  });

  it('POST /api/auth/signUp - ERROR (No account)', (done) => {
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
      });
  });
});
