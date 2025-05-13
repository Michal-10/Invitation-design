// models/user.model.ts
export class User {
  constructor(
    public id: number,
    public email: string,
    public firstName:string,
    public lastName:string,
    public role: string,
    public updatedAt: Date,
    public createdAt: Date,
    public password?:string
  ){}

}
  