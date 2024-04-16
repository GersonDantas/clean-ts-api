import { MongoHelper } from '../helpers/mongo-helpers'
import { AccountMongoRepository } from './account'

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return an account on success', async () => {
    const sut = new AccountMongoRepository()
    const isValid = await sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })

    expect(isValid).toBe(true)
  })
})
