import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ChangePlanComponent } from './change-plan/change-plan.component';

@Component({
  selector: 'app-plan-account',
  templateUrl: './plan-account.component.html',
  styleUrls: ['./plan-account.component.scss']
})
export class PlanAccountComponent implements OnInit {

  user: User;

  activeUsers: number = 0;
  currentPlanValue: number = 0;
  brand: string = 'visa'
  isLoading: boolean = true;

  constructor(private accountService: AccountService, private dialog: MatDialog) {

    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {

    if(this.user.admin){
      this.loadActiveMembers();
    }
  }

  loadActiveMembers() {

    this.isLoading = true;

    this.accountService.getTeamMembers(this.user.idUser, this.user.idGroup).subscribe(res => {
      this.activeUsers = res.length;
      this.currentPlanValue = this.activeUsers *12;
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
    })
  }

  changePlan(){

    this.dialog.open(ChangePlanComponent);


  }

}
