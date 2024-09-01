export type Summary = {
    id:                                   number;
    day:                                  number;
    week:                                 number;
    month:                                number;
    year:                                 number;
    newMembersCount:                      number;
    newMembersIncome:                     string;
    newMembersCashIncome:                 string;
    newMembersTransferIncome:             string;
    newMembersCanceledCount:              number;
    newMembersCanceledIncome:             string;
    newMembersCanceledCashIncome:         string;
    newMembersCanceledTransferIncome:     string;
    renewedMembersCount:                  number;
    renewedMembersIncome:                 string;
    renewedMembersCashIncome:             string;
    renewedMembersTransferIncome:         string;
    renewedMembersCanceledCount:          number;
    renewedMembersCanceledIncome:         string;
    renewedMembersCanceledCashIncome:     string;
    renewedMembersCanceledTransferIncome: string;
    gymClassesCount:                      number;
    gymClassesIncome:                     string;
    gymClassesCashIncome:                 string;
    gymClassesTransferIncome:             string;
    gymClassesCanceledCount:              number;
    gymClassesCanceledIncome:             string;
    gymClassesCanceledCashIncome:         string;
    gymClassesCanceledTransferIncome:     string;
    totalIncome:                          string;
    totalCashIncome:                      string;
    totalTransferIncome:                  string;
    totalCanceled:                        string;
    totalAmount:                          string;
    isModified:                           boolean;
    createdAt:                            Date;
    updatedAt:                            Date;
}
