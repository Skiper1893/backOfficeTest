import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faPencilAlt, faTrash, faSave, faCheck, faBan } from '@fortawesome/free-solid-svg-icons';
import {RoleTypes, Row} from '../../../interfaces';
import { HttpService } from '../../../services/http.service';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import {UserFormHelperService} from '../../../services/userFormHelper.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: '[app-row]',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss', '../table.scss']
})
export class RowComponent implements OnInit {
  _item: Row;
  editedData: Row;
  faPencil = faPencilAlt;
  faTrash = faTrash;
  faSave = faSave;
  faCheck = faCheck;
  faBan = faBan;
  deleteReq = false;
  userForm: any;
  roles = Object.values(RoleTypes);

  @Output() setEdit = new EventEmitter();
  choseEdited(): void {
    this.setEdit.emit(!this.deleteReq);
  }
  @Input('editable') editable: boolean;

  @Input()
  set item(item: Row) {
    this._item = { ...item };
    this.editedData = { ...item };
  }

  get item(): Row {
    return this._item;
  }

  constructor(
    private httpService: HttpService,
    private notificationsService: NotificationsService,
    public helperService: UserFormHelperService,
    private fb: FormBuilder,
  ) { }

  updateUser(): void {
    this.httpService.updateUser(this.editedData).subscribe(data => {
      this.notificationsService.create(
        'system notification',
        data,
        NotificationType.Alert,
        { timeOut: 2000, pauseOnHover: true });
      this.choseEdited();
      this.httpService.getAllUser();
    });
  }

  runDeleteRequest(): void {
    this.deleteReq = !this.deleteReq;
  }

  confirmDelete(): void {
    this.httpService.deleteUser(this._item._id).subscribe(data => {
      this.notificationsService.create(
        'system notification',
        data,
        NotificationType.Success,
        { timeOut: 2000, pauseOnHover: true });
      this.httpService.getAllUser();
    });
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      firstname: this.fb.control(this._item.firstname, [Validators.required]),
      lastname: this.fb.control(this._item.lastname, [Validators.required]),
      email: this.fb.control(this._item.email, [Validators.required, Validators.email]),
      role: this.fb.control(this._item.role, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

}
