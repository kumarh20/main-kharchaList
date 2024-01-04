import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITextInput } from './input-type-text.interface';

@Component({
  selector: 'app-input-type-text',
  templateUrl: './input-type-text.component.html',
  styleUrls: ['./input-type-text.component.css']
})
export class InputTypeTextComponent {
  inputTextValue: string = '';
  @Input() inputTextData: ITextInput = new ITextInput();

  @Output() emitValue: EventEmitter<string> = new EventEmitter();

  emitInputValue(inputTextValue: string){
    this.emitValue.emit(inputTextValue);
  }
}
