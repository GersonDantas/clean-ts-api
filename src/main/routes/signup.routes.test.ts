import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helpers'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

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
