import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { TableRoutingModule } from './table-routing.module';
import { TableComponent } from './table.component';
import { HeaderComponent } from './header/header.component';
import { RowComponent } from './row/row.component';
import { AddRowComponent } from './add-row/add-row.component';
import { HttpService } from '../../services/http.service';
import { WrapperComponent } from './wrapper/wrapper.component';
import { MatSelectModule } from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    TableComponent,
    HeaderComponent,
    RowComponent,
    AddRowComponent,
    WrapperComponent,
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    MatTableModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    FontAwesomeModule,
    MatButtonToggleModule,
    ReactiveFormsModule
  ],
  providers: [HttpService]
})
export class TableModule { }
