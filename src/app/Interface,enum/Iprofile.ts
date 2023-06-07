import { FormArray } from "@angular/forms"

export interface Iprofile{ 
    id:string,
    name: string,
    address: string,
    title: string,
    description: string,
    workHistory: string,
    fixedSalary: number,
    freelancer: boolean,
    client: boolean,
    eductionDTO: [
      {
        titleEdu: string,
        from: Date,
        to: Date
      }
    ]
      skillsDTOs: [
        {
          profileId:string,
          nameskill:string[]
        }
      ]
      langugeDTOs: [
        {
          namelanguge: string[]
        }
      ]
}