export type CreateNewMember = {
    fingerTemplate: string
    id: number
}

export type TodaySummary = {
    newMembersCount: number
    newMembersIncome: number
    newMembersCashIncome: number
    newMembersTransferIncome: number
    newMembersCanceledCount: number
    newMembersCanceledIncome: number
    newMembersCanceledCashIncome: number
    newMembersCanceledTransferIncome: number
    renewedMembersCount: number
    renewedMembersIncome: number
    renewedMembersCashIncome: number
    renewedMembersTransferIncome: number
    renewedMembersCanceledCount: number
    renewedMembersCanceledIncome: number
    renewedMembersCanceledCashIncome: number
    renewedMembersCanceledTransferIncome: number
    gymClassesCount: number
    gymClassesIncome: number
    gymClassesCashIncome: number
    gymClassesTransferIncome: number
    gymClassesCanceledCount: number
    gymClassesCanceledIncome: number
    gymClassesCanceledCashIncome: number
    gymClassesCanceledTransferIncome: number
    totalIncome: number
    totalCashIncome: number
    totalTransferIncome: number
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