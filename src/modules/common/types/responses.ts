export type CreateNewMember = {
    fingerTemplate: string
    id: number
}

export type TodaySummary = {
    newMembersCount: number
    newMembersIncome: number
    newMembersCanceledCount: number
    newMembersCanceledIncome: number
    renewedMembersCount: number
    renewedMembersIncome: number
    renewedMembersCanceledCount: number
    renewedMembersCanceledIncome: number
    gymClassesCount: number
    gymClassesIncome: number
    gymClassesCanceledCount: number
    gymClassesCanceledIncome: number
    totalIncome: number
}