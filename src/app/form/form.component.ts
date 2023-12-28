import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { IFormData, dialogInput } from './form.interface';
import { FormService } from './form.service';
import { ListService } from '../list/list.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
   listValues:IFormData[] = [];
   selectedDateTime: Date = new Date();
   formDefaultVaues: IFormData = {
    id: 0,
    name: '',
    date: '',
    price: 0
   };
   selectedTime: Date = new Date();
  userForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    passowrd: new FormControl('', Validators.required),

  })
  addProductForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public _formData: dialogInput,
    private _dialogRef: DialogRef<any>,
    private _formService: FormService,
    private _listService: ListService,
    private _datePipe: DatePipe
  ){}
  ngOnInit(): void {
    this.getProductList() 
    if(this._formData.data){
      this.selectedDateTime = new Date(this._formData.data.date);
      this.addProductForm.setValue({name: this._formData.data.name, price: this._formData.data.price, date: new Date(this._formData.data.date)})
    }
  }
 onSubmit(formType:string, formData: any, event: Event){
  event.preventDefault();
  let formValue: IFormData = formData.value;
  // set id 
  if(this._formData.data.id == null|| this._formData.data.id == undefined) {
    formValue = this.setFormValues(formData.value)
  }
  switch(formType){
    case 'userForm':
      break;
      case 'addProductForm':
        this.saveDataToLocalStorage(formValue);
      break;
      case 'editForm':
        this.updateDataToLocalStorage(formValue, this._formData.data.id );
      break;
      default:

  }
 }
 closeDialog(data: any){
  this._dialogRef.close();
 }
 private saveDataToLocalStorage(formValues:IFormData){
  this.listValues.push(formValues);
  this.storeMapToLocalStorage(`prodList`,this.listValues);
  this.getProductList();
  this.emitFormData(true);
  this.closeDialog(this.listValues);
 }

 private updateDataToLocalStorage(formValue: IFormData, prodId: number | null = null){
  this.getProductList();
  const Index =  this.listValues.findIndex((res: any)=> res.id == prodId);
  if(Index !== -1){
    this.listValues[Index] = this.setFormValues(formValue, prodId);
  }
  this.storeMapToLocalStorage(`prodList`,this.listValues);
  this.emitFormData(true);
  this.closeDialog(this.listValues);  
 }

 setFormValues(formValues: IFormData, prodId: number | null = null){
  
   formValues.id = prodId == undefined || prodId == null ? this.generateId() : prodId;
  formValues.name = formValues.name
  formValues.date = this.getLocalDate(formValues);
  return formValues;
 }
 private getLocalDate(formValues:IFormData):string {
  if (formValues) {
    const localDate = this._datePipe.transform(this.selectedDateTime, 'yyyy-MM-dd h:mm:ss a'); 
    return localDate as string;
  } else {
    return '';
  }
 }
 private generateId(){
  const randomNumber = Math.floor(Math.random() * 900000) + 100000;
  return randomNumber;
 }

 private storeMapToLocalStorage(key:string, prodData: IFormData[]) {
  const serializedMap = JSON.stringify([...prodData]);
  localStorage.setItem(key, serializedMap);
}
private getProductList() {
  const list: string = localStorage?.getItem('prodList') ?? "";
  this.listValues =  JSON.parse(list);
  
}
private emitFormData(value: boolean = false){
  this._listService.isEmitted$.next(true);
}
onDateTimeSelected(selectedDate: Date){
  this.selectedDateTime = selectedDate;
}
}
