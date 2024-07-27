export type Member = {
  "id": number
  "fullName": string
  "phoneNumber": string
  "isActive": boolean
  "dni": string
}

export type MemberField = keyof Member
export type MemberFieldValue<K extends MemberField> = Member[K]