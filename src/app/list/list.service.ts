import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { DialogRef } from '@angular/cdk/dialog';
import { Subject } from 'rxjs';
import { TabelData } from '../custom-table/custom-table.interface';

@Injectable({
  providedIn: 'root'
})
export class ListService {
isEmitted$: Subject<boolean> = new Subject();
dataList$: Subject<any[]> = new Subject(); 
  constructor(
    private _dialog: MatDialog,
    ) { }


    openDialog(data: any, formType: string): any{
      const formData = {
        data: data,
        formType: formType
      }
      const matConfig: MatDialogConfig = {
        disableClose: true,
        width: '500px',
        data: formData
      }
      const dialogRef = this._dialog.open<FormComponent>(FormComponent, matConfig);
      
     return dialogRef.afterClosed()
    }
}

