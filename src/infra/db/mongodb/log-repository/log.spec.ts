import { type Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helpers'
import { LogMongoRepository } from './log'

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository()
}

let errorCollection: Collection

describe('LogRepository', () => {
  beforeAll(async () => {
    console.log(global.__MONGO_URI__)
    await MongoHelper.connect(global.__MONGO_URI__)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  test('Should create an error log ', async () => {
    const sut = makeSut()
    await sut.logError('any_error')
    console.log('errorCollection', errorCollection)
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
