import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { TabelData } from './custom-table.interface';
import { ELEMENT_DATA } from './custom-table.contant';
import { FormService } from '../form/form.service';
import { ListService } from '../list/list.service';
import { IFormData } from '../form/form.interface';
import { FormLabels } from '../list/list.constant';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent implements OnInit, OnChanges {
  @Input()  tabelData: TabelData = new TabelData();
  @Output() emitEditAction: EventEmitter<any> = new EventEmitter();
  @Output() emitDeleteAction: EventEmitter<any> = new EventEmitter();
  @Output() addNoteButtonClicked: EventEmitter<any> = new EventEmitter();
  headerColumns: string[] = [];
  dataList: any[] = [];
  tableClass: string = '';
  formLabels = FormLabels;
  constructor(
    private _formService: FormService,
    private _cdr: ChangeDetectorRef,
    private _listService: ListService
  ){}
  ngOnInit(): void {
    // console.log(this.tabelData);
    this.headerColumns = this.tabelData?.headerColumns;
    // this.dataList = this.tabelData?.dataList;
    this.dataList = this.mapTotalRow(this.tabelData?.dataList);

    this.tableClass = this.tabelData?.tabelClass;
  }
  ngOnChanges(): void {
    this.assignTabelData();
  }
  private assignTabelData(){
    this._listService.dataList$.subscribe(res=>{
      console.log("custom table subscribe");
      
      if(res && Array.isArray(res)){
        this.headerColumns = this.tabelData?.headerColumns;
        this.dataList = this.mapTotalRow(res);
        this.tableClass = this.tabelData?.tabelClass;
      }
    })
  }
  mapTotalRow(res: any){
    let TotalRow = {
      name:"Total",
      id:"total",
      date: null,
      price: null
    }
    res = res.reverse();
    const total = res.reduce((accumulator: any, currentValue: any) => {
      return accumulator + currentValue.price;
    }, 0);
    TotalRow.price = total;
    res = [...res, TotalRow]
    return res
  }

  editRow(event: any, formType: string){
    this.emitEditAction.emit({event, formType});
  }

  deleteRow(event: any){
    this.emitDeleteAction.next(event);
  }

  calculateTotalPrice(element: any){}
  clickedAddItem(event?: Event ){
    this.addNoteButtonClicked.emit(true);
  }
}