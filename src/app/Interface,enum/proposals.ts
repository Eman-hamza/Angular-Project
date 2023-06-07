export interface IProposal{
    id: number,
    jobId: number,
    coverLetter: string,
    proposedPrice: number,
    address: string,
    createdAt: Date,
    freelancerID: number,
    freelancerName: string,
    freelancerEmail: string,
    freelancerImage:string,
    skills:string [
      ]
    }
