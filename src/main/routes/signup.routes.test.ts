import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Should return isValid on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'gerson',
        email: 'gerson.gerson@email.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
