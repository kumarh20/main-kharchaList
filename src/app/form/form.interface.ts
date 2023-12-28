export interface IFormData{
    id:number;
    name: string;
    date: string;
    price:number;
}

export interface dialogInput{
    data: IFormData;
    formType: string;
}