export interface IJob {
    id: number,
    title: string,
    budget: number,
    field: string,
    jopBody: string,
    profileId: string,
    connects : number,
    isSaved : boolean,
    isHourly : boolean,
    CategoryId : number,
    LocationId : number,
    profile: object,
    proposals?: Proposal[],
    reviews?: review[],
    contracts?: contract[]

}

export interface IProposalPost {
    userID: string
}

export interface Proposal {
    userId: number,
    jobId: number,
    coverLetter: string,
    proposedPrice: number,
}

export interface ProposalDTO {
    coverLetter: string;
    proposedPrice: number;
    userId: string;
    jobId: number;
}
export interface review {
    userId: number;
    jobId: number;
    rating: number;
    comment: string;
}

export interface contract {
    clientId: number;
    freelancerId: number;
    jobId: number;
    price: number;
    createdAt: Date;
    completedAt: Date;
}