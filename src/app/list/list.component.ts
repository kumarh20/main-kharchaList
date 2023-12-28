import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormLabels, TabelDataList, TableClass, TableHeaderColumns } from './list.constant';
import { TabelData } from '../custom-table/custom-table.interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { ListService } from './list.service';
import { FormService } from '../form/form.service';
import { SubSink } from 'subsink';
import { IFormData } from '../form/form.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit{
  selectedDateTime: Date = new Date();
  userForm: FormGroup = new FormGroup({});
  tabelData:TabelData = new TabelData();
  showFiller = false;
  private subs = new SubSink();
  prodList: IFormData[] = [];
  formLabels = FormLabels;
  constructor(
    public _dialog: MatDialog,
    private _listService: ListService,
    private _formService: FormService
    ){}

    ngOnInit(): void {
      const GetLocalStorageData = localStorage.getItem('prodList');
      this.tabelData.headerColumns = TableHeaderColumns;
      this.tabelData.tabelClass =  TableClass;
      if(GetLocalStorageData != null && GetLocalStorageData != undefined){
        this.tabelData.dataList = JSON.parse(GetLocalStorageData);
        this.prodList = JSON.parse(GetLocalStorageData);
      }
    }
  onSubmit(){}

  openFormDialog(event: any, formType: string){
    this._listService.openDialog(event, formType)
      .subscribe((res:any)=>{
        if(res == undefined){
          this.getNewData()
        }
      })
    }

    getEditData(event:any){    
      this._listService.openDialog(event.event, event.formType)
        .subscribe((arg:any) =>{
          if(arg == undefined){
            this.getNewData()
          }
          
        });    
    }
    getDeleteData(rowData: IFormData){
      const rowIndex = this.prodList.findIndex(res=>res.id == rowData.id);
      if(rowIndex !== -1){
        this.prodList.splice(rowIndex, 1);
      }
      localStorage.setItem('prodList', JSON.stringify(this.prodList));
      this.getNewData();
    }

    ngOnDestroy() {
      this.subs.unsubscribe();
    }
    getNewData(){
      const TabelData = localStorage.getItem('prodList');
              if(TabelData){
                this.tabelData.dataList = JSON.parse(TabelData) 
                this._listService.dataList$.next(JSON.parse(TabelData));
              }
    }
    addNoteButtonClicked(isClicked:boolean ) {
      this.openFormDialog(isClicked, FormLabels.addForm)
    }
  }
