export interface Idisplay{
    ownerOfAccountIdThatPostedThisJob: number,
    jobName: string,
    jobPrice: number,
    jobDescription: string,
    proposalNumber: number,
    timeTheJobWasPostedIn: Date,
    totalPriceThatClientPayed: number,
    nameOfClient: string,
    connectsNeedForThisJob: number,
    isHourly: Boolean,
    isSaved:boolean
    
}