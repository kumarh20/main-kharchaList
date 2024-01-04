import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IDateInput } from './input-type-date.interface';

@Component({
  selector: 'app-input-type-date',
  templateUrl: './input-type-date.component.html',
  styleUrls: ['./input-type-date.component.css']
})
export class InputTypeDateComponent {
  inputTextValue: string = '';
  @Input() inputDateData: IDateInput = new IDateInput();

  @Output() emitValue: EventEmitter<string> = new EventEmitter();

  emitInputValue(inputTextValue: string){
    this.emitValue.emit(inputTextValue);
  }

}
