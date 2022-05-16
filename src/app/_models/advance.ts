import { User } from "./user"

export class Advance {
  idAdvance: number
  project: string
  reason: [string]
  user: User
  value: number
  currency: string
  exchange: number
  regDate: string
  receiveType: string
  deadline: string
  status: AdvanceStatus
  active: boolean
}

export enum AdvanceStatus {
  cr = 'cr',
  ap = 'ap',
  re = 're',
  ca = 'ca'
}
