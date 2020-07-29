import { Injectable } from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserFormHelperService {

  constructor() { }

  getErrorMessage(form: FormGroup, fieldName: string): string {
    const control: AbstractControl = form.get(fieldName);
    switch (true) {
      case (control && control.dirty && control.hasError('required')):
        return 'This field is required';
      case (control && control.dirty && control.hasError('email')):
        return 'Please use valid email';
      default:
        return '';
    }
  }
}
