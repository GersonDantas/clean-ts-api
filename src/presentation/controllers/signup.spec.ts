import { SignupController } from './signup'

describe('SignupController', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = new SignupController()
    // request post type
    const httpRequest = {
      body: {
        email: 'any_email@hotmail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    // when without property name expected error
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
