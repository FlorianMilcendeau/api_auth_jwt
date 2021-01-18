require('dotenv').config();
const request = require('supertest');
const app = require('../../app');

describe('Route signUp', () => {
  it('POST /api/auth/signUp - ERROR (fields no provided)', (done) => {
    request(app)
      .post('/api/auth/signUp')
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
      });
  });
});
