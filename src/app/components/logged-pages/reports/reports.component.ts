import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  user: User;

  constructor(private accountService: AccountService) {

    this.accountService.user.subscribe(x => this.user = x);

   }

  ngOnInit(): void {

  }

}

