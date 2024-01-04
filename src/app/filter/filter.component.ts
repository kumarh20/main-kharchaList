import { Component, EventEmitter, Output } from '@angular/core';
import { InputDateData, InputTextData } from './filter.contant';
import { ITextInput } from '../reusable-components/input-type-text/input-type-text.interface';
import { IDateInput } from '../reusable-components/input-type-date/input-type-date.interface';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Output() emitNameFilterValue: EventEmitter<string> = new EventEmitter()
  @Output() emitDateFilterValue: EventEmitter<string> = new EventEmitter()
  inputTextData: ITextInput = InputTextData;
  inputDateData: IDateInput = InputDateData;

  getInputTextValue(inputTextValue: string): void {
    this.emitNameFilterValue.emit(inputTextValue)
    
  }
  
  getInputDateValue(InputDateValue: string): void {
    this.emitDateFilterValue.emit(InputDateValue)
  }
}
