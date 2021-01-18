require('dotenv').config();
const request = require('supertest');
const app = require('../../app');
const connection = require('../../config/connection');

describe('Route signIn', () => {
  it('POST /api/auth/signIn - ERROR (field(s) no provided)', (done) => {
    request(app)
      .post('/api/auth/signIn')
      .send({})
      .expect(422)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toEqual({
          errors: expect.arrayContaining([
            expect.objectContaining({
              msg: expect.any(String),
            }),
          ]),
        });
        done();
      })
      .catch((err) => done(err));
  });

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

  afterAll(() => connection.end());
});
