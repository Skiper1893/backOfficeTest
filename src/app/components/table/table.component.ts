import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Row } from 'src/app/interfaces/row';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  get rows(): Observable<Array<Row>> {
    return this.httpService.users;
  }

  constructor(
    private httpService: HttpService,
  ) { }

  ngOnInit(): void {  }

}
