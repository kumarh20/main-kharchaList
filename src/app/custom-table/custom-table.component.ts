import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { TabelData } from './custom-table.interface';
import { ELEMENT_DATA } from './custom-table.contant';
import { FormService } from '../form/form.service';
import { ListService } from '../list/list.service';
import { IFormData } from '../form/form.interface';
import { FormLabels } from '../list/list.constant';
import { NameFilterPipe } from '../pipes/name-filter.pipe';


@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent implements OnInit, OnChanges {
  @Input()  tabelData: TabelData = new TabelData();
  @Input()filterValue: string = '';
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
    private _listService: ListService,
    private _namePipe: NameFilterPipe,
  ){}
  ngOnInit(): void {
    this.headerColumns = this.tabelData?.headerColumns;
    this.dataList = this.mapTotalRow(this.tabelData?.dataList);
    this.tableClass = this.tabelData?.tabelClass;
  }
  ngOnChanges(): void {
    this.assignTabelData();
    if(this.filterValue.length > 0) {
    this.dataList = this._namePipe.transform(this.filterValue, this.dataList)
    }else if(this.filterValue.length == 0){
      const TabelData = localStorage.getItem('prodList');
              if(TabelData){
                this.dataList = this.mapTotalRow(JSON.parse(TabelData)) }
    }
      
    
  }
  private assignTabelData(){
    this._listService.dataList$.subscribe(res=>{
      
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