export type Member = {
  id: string
  fullName: string
  phoneNumber: string
  currentStatus: MemberCurrentStatus
  dni: string
}

export type MemberCurrentStatus = 'Inactivo' | 'Dia' | 'Semana' | 'Mes'

export type MemberField = keyof Member
export type MemberFieldValue<K extends MemberField> = Member[K]