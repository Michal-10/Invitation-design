import { TemplateField } from "./TemplateField";

export class Template{
    constructor(
        public createdAt:Date,
        public id:string,
        public fileUrl:string,
        public name:string,
        public updatedAt:Date,
        public userId:number,
        public templateFields:TemplateField[]
    ) {}
}