export class User{
    constructor(
        public userName:string,
        public email:string,
        public password:string,
        public confirmpassword:string,
        public id?:string,
        
    )
    {}

}