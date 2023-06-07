import { User } from "./User";

export interface Ichat
{
    id:string,
    senderId: string,
    recieveId: string,
    content: string,
    createdAt: Date,
    recieveuser:User,
    senduser:User,
    
}