export type Summary = {
    id:                           number;
    day:                          number;
    week:                         number;
    month:                        number;
    year:                         number;
    newMembersCount:              number;
    newMembersIncome:             string;
    newMembersCanceledCount:      number;
    newMembersCanceledIncome:     string;
    renewedMembersCount:          number;
    renewedMembersIncome:         string;
    renewedMembersCanceledCount:  number;
    renewedMembersCanceledIncome: string;
    gymClassesCount:              number;
    gymClassesIncome:             string;
    gymClassesCanceledCount:      number;
    gymClassesCanceledIncome:     string;
    totalIncome:                  string;
    totalCanceled:                string;
    totalAmount:                  string;
    isModified:                   boolean;
    createdAt:                    Date;
    updatedAt:                    Date;
}
