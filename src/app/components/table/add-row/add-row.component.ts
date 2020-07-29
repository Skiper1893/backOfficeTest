import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faCheck, faBan } from '@fortawesome/free-solid-svg-icons';
import { RoleTypes } from '../../../interfaces';
import { HttpService } from '../../../services/http.service';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ValidForm } from '../../../decorators/validForm';
import { UserFormHelperService } from '../../../services/userFormHelper.service';

@Component({
  selector: '[app-add-row]',
  templateUrl: './add-row.component.html',
  styleUrls: ['./add-row.component.scss', '../row/row.component.scss', '../table.scss']
})
export class AddRowComponent implements OnInit {
  userForm: any;
  faCheck = faCheck;
  faBan = faBan;
  selectedOption = 'all';
  roles = Object.values(RoleTypes);

  @Output() setStateAddNewRow = new EventEmitter();
  changeState(): void {
    this.setStateAddNewRow.emit();
  }

  constructor(
    private httpService: HttpService,
    private notificationsService: NotificationsService,
    private fb: FormBuilder,
    public helperService: UserFormHelperService,
  ) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  @ValidForm()
  create(form: FormGroup): void {
    if (this.userForm.dirty && this.userForm.valid) {
      this.httpService.createUser({ ...this.userForm.value }).subscribe(data => {
        this.notificationsService.create(
          'system notification',
          data,
          NotificationType.Alert,
          { timeOut: 2000, pauseOnHover: true });
        this.httpService.getAllUser();
        this.changeState();
      });
    }
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      firstname: this.fb.control('', [Validators.required]),
      lastname: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      role: this.fb.control('', [Validators.required])
    });
  }
}
