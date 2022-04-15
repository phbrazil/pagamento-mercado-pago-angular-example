export class User {
  token: string
  idUser: number
  name: string
  username: string
  email: string
  regDate: string
  pendingRegistration: boolean
  pendingEmailConfirmation: boolean
  message: string
  changePassword: boolean
  admin: boolean
  isActive: boolean
  isTrial: boolean
}
