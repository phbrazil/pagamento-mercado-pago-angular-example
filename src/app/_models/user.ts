export class User {
  token: string
  idUser: number
  idGroup: number
  name: string
  username: string
  email: string
  regDate: string
  pendingRegistration: boolean
  pendingEmailConfirmation: boolean
  message: string
  changePassword: boolean
  admin: boolean
  active: boolean
  isTrial: boolean
  phone: string
}
