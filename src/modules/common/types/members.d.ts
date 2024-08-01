export type Member = {
  id: string
  fullName: string
  phoneNumber: string
  status: MemberStatus
  dni: string
}

export type MemberStatus = 'Inactivo' | 'Dia' | 'Semana' | 'Mes'

export type MemberField = keyof Member
export type MemberFieldValue<K extends MemberField> = Member[K]