import { TemplateField } from "./TemplateField";

export interface Template {
    id: number;
    name: string;
    imageUrl: string;
    description: string;
    categoryId: number;
    Fields :TemplateField[]
  }