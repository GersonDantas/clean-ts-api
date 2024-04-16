import { type AddAccountRepository } from '../../../../data/protocols'
import { type AddAccountModel } from '../../../../domain/usecases'
import { MongoHelper } from '../helpers/mongo-helpers'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<boolean> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return result.insertedId !== null
  }
}
