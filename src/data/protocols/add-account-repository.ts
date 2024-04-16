import { type AddAccountModel } from '../../domain/usecases'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<boolean>
}
