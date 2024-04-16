import { type AddAccountModel, type Encrypter, type AddAccountRepository } from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'

const makeEncrypter = (): Encrypter => {
  class EncryptStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => { resolve('hashed_password') })
    }
  }

  return new EncryptStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountModel): Promise<boolean> {
      return await new Promise(resolve => { resolve(true) })
    }
  }

  return new AddAccountRepositoryStub()
}

interface SutTypes {
  sut: DbAddAccount
  encryptStub: Encrypter
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const encryptStub = makeEncrypter()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(encryptStub, addAccountRepositoryStub)

  return {
    sut,
    encryptStub,
    addAccountRepositoryStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { sut, encryptStub } = makeSut()
    const encryptSpy = jest.spyOn(encryptStub, 'encrypt')
    const accountData = {
      email: 'valid_email',
      name: 'valid_name',
      password: 'valid_password'
    }

    await sut.add(accountData)

    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encryptStub } = makeSut()
    jest.spyOn(encryptStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
    const accountData = {
      email: 'valid_email',
      name: 'valid_name',
      password: 'valid_password'
    }

    const promise = sut.add(accountData)

    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accountData = {
      email: 'valid_email',
      name: 'valid_name',
      password: 'valid_password'
    }

    await sut.add(accountData)

    expect(addSpy).toHaveBeenCalledWith({
      email: 'valid_email',
      name: 'valid_name',
      password: 'hashed_password'
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
    const accountData = {
      email: 'valid_email',
      name: 'valid_name',
      password: 'valid_password'
    }

    const promise = sut.add(accountData)

    await expect(promise).rejects.toThrow()
  })

  test('Should return an account  on success', async () => {
    const { sut } = makeSut()
    const accountData = {
      email: 'valid_email',
      name: 'valid_name',
      password: 'valid_password'
    }

    const isValid = await sut.add(accountData)

    expect(isValid).toBe(true)
  })
})
