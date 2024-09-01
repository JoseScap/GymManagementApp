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

export type WeekSummary = {
    newMembersCount: string
    newMembersIncome: string
    newMembersCanceledCount: string
    newMembersCanceledIncome: string
    renewedMembersCount: string
    renewedMembersIncome: string
    renewedMembersCanceledCount: string
    renewedMembersCanceledIncome: string
    gymClassesCount: string
    gymClassesIncome: string
    gymClassesCanceledCount: string
    gymClassesCanceledIncome: string
    totalIncome: string
    totalCanceled: string
    totalAmount: string
}