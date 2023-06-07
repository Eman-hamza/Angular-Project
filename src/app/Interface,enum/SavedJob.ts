export class ISavedJob{
    id!: number
  userId: string
  jobId: number
  constructor(userId:string,jobid:number){
    this.userId=userId;
    this.jobId=jobid
  }
}