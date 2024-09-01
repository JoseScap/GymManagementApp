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
    newMembersCashIncome: string
    newMembersTransferIncome: string
    newMembersCanceledCount: string
    newMembersCanceledIncome: string
    newMembersCanceledCashIncome: string
    newMembersCanceledTransferIncome: string
    renewedMembersCount: string
    renewedMembersIncome: string
    renewedMembersCashIncome: string
    renewedMembersTransferIncome: string
    renewedMembersCanceledCount: string
    renewedMembersCanceledIncome: string
    renewedMembersCanceledCashIncome: string
    renewedMembersCanceledTransferIncome: string
    gymClassesCount: string
    gymClassesIncome: string
    gymClassesCashIncome: string
    gymClassesTransferIncome: string
    gymClassesCanceledCount: string
    gymClassesCanceledIncome: string
    gymClassesCanceledCashIncome: string
    gymClassesCanceledTransferIncome: string
    totalIncome: string
    totalCashIncome: string
    totalTransferIncome: string
    totalCanceled: string
    totalAmount: string
}