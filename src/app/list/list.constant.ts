import { TabelData } from "../custom-table/custom-table.interface";

export enum FormLabels {
editForm = "editForm", 
addForm = "addForm", 
}
export const TabelDataList: TabelData = {
            tabelClass: 'login-class width-80',
            headerColumns: [
                "name", "price", "date", "action"
             ],

        dataList:[
            {
            name:"Rent",
            price:500,
            date:'11-5-2023 10:00 am',
            action: "edit"
        },
        {
            name:"Nasta",
            price:200,
            date:'11-5-2023 10:00 am',
            action: "edit"
        },
        {
            name:"Petrol",
            price:100,
            date:'11-5-2023 10:00 am',
            action: "edit"
            },
    ]
    }

    export const TableHeaderColumns = [
        "name", "price", "date", "action"
     ]
     export const TableClass = 'login-class width-80'
