import { User } from "./user"

export class Settings {
  idSetting: number
  idUser: number
  advanceRequestApproval: boolean
  emailsAdvanceNotify: string[]
  advanceAlertDays: number
  maxOpenAdvance: number
  refundRequestApproval: boolean
  maxOpenRefund: number
  emailsRefundNotify: string[]
  timeRequestApproval: boolean
  timeAlertDays: string[]
  user: User
  defaultColor: string;
  profileImage: string;
}
