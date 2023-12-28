import { Component, Output, EventEmitter, ViewChild, ElementRef, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.css']
})
export class DateTimePickerComponent implements OnInit, OnChanges{
  @Output() dateTimeSelected = new EventEmitter<Date>();
  @ViewChild('dateTimeInput') dateTimeInput: ElementRef = new ElementRef({});

  @Input() selectedDateTime: Date = new Date();
  selectedDateTimeInput: Date = new Date();
  isDialogOpen: boolean = false;

  constructor(){}
  ngOnInit(){}
  ngOnChanges(){
    this.selectedDateTime = this.selectedDateTime;
  }

  onDateTimeChange(event: any) {
    this.selectedDateTime = new Date(event.target.value);
    this.dateTimeSelected.emit(this.selectedDateTime);
  }
  openCalendar(): void {
    this.dateTimeInput.nativeElement.click();
  }
  
}
