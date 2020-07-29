import { Component, OnInit } from '@angular/core';
import { RoleTypes } from '../../../interfaces';
import {HttpService} from '../../../services/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  selectedOption = 'all';
  searchValue;
  roles = ['all', ...Object.values(RoleTypes)];
  constructor(
    private httpService: HttpService,
  ) { }

  changeType(): void {
    this.httpService.getAllUser(this.selectedOption, this.searchValue);
  }

  search(): void {
    this.httpService.getAllUser(this.selectedOption, this.searchValue);
  }

  ngOnInit(): void {
  }

}
