import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-plan-account',
  templateUrl: './plan-account.component.html',
  styleUrls: ['./plan-account.component.scss']
})
export class PlanAccountComponent implements OnInit {

  user: User;

  activeUsers: number = 10;
  currentPlanValue: number = 120;
  brand: string = 'visa'

  constructor(private accountService: AccountService) {

    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {
  }

}
