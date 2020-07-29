import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';

@Injectable({
  providedIn: 'root',

})
export class ErrorService implements ErrorHandler{

  private notificationsService: NotificationsService;

  constructor(
    private injector: Injector
  ) {
    this.notificationsService = injector.get(NotificationsService);
  }

  handleError(res: any) {
    console.log(res);
    this.notificationsService.create(
      'Error notification',
      res.error && res.error.message || res.message,
      NotificationType.Error,
      { timeOut: 5000, pauseOnHover: true
      });
  }
}
