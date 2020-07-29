import {Component, Input, OnInit} from '@angular/core';
import { Row } from '../../../interfaces/row';
import { RoleColor } from '../../../interfaces';
import {HttpService} from '../../../services/http.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss', '../table.scss']
})
export class WrapperComponent implements OnInit {
  _elements;
  roleColors = RoleColor;
  editedComponent;
  addRowDataState;

  @Input()
  set elements(elements: Row[]) {
    this._elements = elements || [];
  }

  get elements(): Row[] { return this._elements; }

  tableHeaders = ['firstname', 'lastname', 'email', 'role'];

  constructor(
    private httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.httpService.newRowAction.subscribe(data => this.addRowDataState = data);
  }

  setEditedComponent(index): void {
    if (this.editedComponent === index) {
      this.editedComponent = null;
    } else {
      this.editedComponent = index;
    }
  }

  changeStateAddNewRow(): void {
    this.httpService.setAddNewRowState(this.addRowDataState);
  }
}
