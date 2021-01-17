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
      .then((response) => {
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
        expect(response.body).toEqual(expected);
        done();
      });
  });
});
