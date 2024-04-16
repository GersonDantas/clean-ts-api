export interface AddAccountModel {
  email: string
  name: string
  password: string
}

export interface AddAccount {
  add: (data: AddAccountModel) => Promise<boolean>
}
