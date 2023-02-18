import Child from "./Child";

export default class User {

    constructor(public Id:number,public FirstName:string,public LastName:string,public HMO:string,public EGender:number,public DOB:Date,public arrChild:Child[]){

    }

}
