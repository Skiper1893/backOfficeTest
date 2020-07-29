import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private notificationsService: NotificationsService;
  private usersData = new BehaviorSubject([]);
  private addNewRowData = new BehaviorSubject(false);
  public users = this.usersData.asObservable();
  public newRowAction = this.addNewRowData.asObservable();

  constructor(
    private injector: Injector,
    private http: HttpClient,
  ) {
    this.notificationsService = injector.get(NotificationsService);
    this.getAllUser();
  }

  getAllUser(filter = 'all', search?): void {
    let url = `${environment.apiUrl}/user/${filter}`;

    if (search) {
      url = `${url}?search=${search}`;
    }

    this.http.get(url)
      .pipe(map((data: any) => data.users))
      .subscribe((users: object[]) => {
      this.usersData.next(users);
    });
  }

  createUser(user): Observable<any> {
    const url = `${environment.apiUrl}/user`;
    return this.http.post(url, { ...user }).pipe(map((data: any) => data.message));
  }

  updateUser(user): Observable<any> {
    const url = `${environment.apiUrl}/user/${user._id}`;
    return this.http.patch(url, { ...user }).pipe(map((data: any) => data.message));
  }

  deleteUser(userId): Observable<any> {
    const url = `${environment.apiUrl}/user/${userId}`;
    return this.http.delete(url).pipe(map((data: any) => data.message));
  }

  setAddNewRowState(state): void {
    this.addNewRowData.next(!state);
  }
}
