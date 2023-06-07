export interface IprofileComplete
{
    id: string,
    name: string,
    address:string,
    title: string,
    description: string,
    workHistory: string,
    fixedSalary: Number,
    profileImage: string,
    freelancer: Boolean,
    client: Boolean,
    portfoliTitle: string,
    portflioDescription:string,
    portfoliolink:string,
    aUser: null,
    jobs: null,
    education: [
      {
        id: string,
        titleEdu:string,
        from: Date,
        to: Date,
        profileId:string,
        profile: null
      }
    ],
    skill: [
      {
        id: number,
        nameskill: string,
        profileId: string,
        profile: null
      }
    ],
    languge: [
      {
        id: number,
        namelanguge: string,
        profileId: string,
        profile: null
      }
    ]
  }