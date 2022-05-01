import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Plan } from 'src/app/_models/plan';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { PlanService } from 'src/app/_services/plan.service';

@Component({
  selector: 'app-change-plan',
  templateUrl: './change-plan.component.html',
  styleUrls: ['./change-plan.component.scss']
})
export class ChangePlanComponent implements OnInit {

  plan: Plan;
  user: User;

  isLoading: boolean = false;

  isRefund: boolean = false;
  isAdvance: boolean = false;
  isTime: boolean = false;

  constructor(private planService: PlanService, private accountService: AccountService,
    private dialog: MatDialog) {

    this.accountService.user.subscribe(x => this.user = x);

   }

  ngOnInit(): void {

    this.loadRoles();
  }

  loadRoles(){
    this.isLoading = true;
    this.planService.getPlan(this.user.idUser, this.accountService.getToken()).subscribe(plan=>{

      this.plan = plan;

      this.isLoading = false;

      this.checkCurrentPlan(plan);

      console.log(plan)

    }, _err=>{
      this.isLoading = false;
    })
  }

  close(){
    this.dialog.closeAll();
  }

  onSubmit(){

  }

  checkIsRefund(){
    this.isRefund = !this.isRefund;
  }

  checkIsTime(){
    this.isTime = !this.isTime;
  }

  checkIsAdvance(){
    this.isAdvance = !this.isAdvance;
  }

  checkCurrentPlan(plan: Plan){

    this.isAdvance = plan.enableAdvance;
    this.isTime = plan.enableTime;
    this.isRefund = plan.enableRefund;

  }

}
