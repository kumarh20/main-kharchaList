import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { CustomTableComponent } from './custom-table/custom-table.component';
import { FormComponent } from './form/form.component';
import {MatTableModule} from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HeaderComponent } from './header/header.component';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import { CommonModule, DatePipe } from '@angular/common';
import { FilterComponent } from './filter/filter.component';
import { NameFilterPipe } from './pipes/name-filter.pipe';
import { DateFilterPipe } from './pipes/date-filter.pipe';
import { InputTypeTextComponent } from './reusable-components/input-type-text/input-type-text.component';
import { InputTypeDateComponent } from './reusable-components/input-type-date/input-type-date.component';




@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CustomTableComponent,
    FormComponent,
    ListComponent,
    CustomTableComponent,
    HeaderComponent,
    DateTimePickerComponent,
    DateTimePickerComponent,
    FilterComponent,
    NameFilterPipe,
    DateFilterPipe,
    InputTypeTextComponent,
    InputTypeDateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSidenavModule, 
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    CommonModule
    // DatePipe should not be included here
  ],
  providers: [
    DatePipe,
    NameFilterPipe,
    DateFilterPipe,],  // This line is okay if you need to provide the DatePipe globally
  bootstrap: [AppComponent],
  schemas:[NO_ERRORS_SCHEMA]
})
export class AppModule { }
