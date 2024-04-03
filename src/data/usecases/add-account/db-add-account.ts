import { type AccountModel, type AddAccount, type AddAccountModel, type Encrypter } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    return new Promise(resolve => {
      resolve({
        id: '',
        email: '',
        name: '',
        password: ''
      })
    })
  }
}
