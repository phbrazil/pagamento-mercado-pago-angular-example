import { User } from "./user"

export class Plan {
  idPlan: number
  idUser: number
  plan: string
  enableTime: boolean
  enableRefund: boolean
  enableAdvance: boolean
  usuario: User

}
