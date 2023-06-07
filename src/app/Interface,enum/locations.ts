export interface Ilocation{
    id:number,
    Name:string,
    jobs:[{
        id: number,
      title: string,
      budget: number,
      description: string,
      createdAt: Date,
      locationID: number,
      categoryId: number
    }]
}