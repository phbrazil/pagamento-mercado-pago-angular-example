import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Card } from 'src/app/_models/payment/card';
import { Plan } from 'src/app/_models/plan';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { CardService } from 'src/app/_services/card.service';
import { PlanService } from 'src/app/_services/plan.service';
import { TeamService } from 'src/app/_services/team.service';
import { ChangePlanComponent } from './change-plan/change-plan.component';
import { DeleteCardComponent } from './new-card/delete-card/delete-card.component';

@Component({
  selector: 'app-plan-account',
  templateUrl: './plan-account.component.html',
  styleUrls: ['./plan-account.component.scss']
})
export class PlanAccountComponent implements OnInit {

  user: User;

  activeUsers: number = 1;
  currentPlanValue: number = 0;
  brand: string = 'visa'
  isLoading: boolean = false;
  isLoadingCard: boolean = false;
  isLoadingPlan: boolean = false;
  isPlanSelected: boolean = false;
  plan: Plan;
  card: Card;

  constructor(private accountService: AccountService, private dialog: MatDialog,
    private planService: PlanService, private cardService: CardService,
    private teamService: TeamService) {

    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {

    /*this.planService.getIsReload().subscribe(status => {

      if (status != null && status) {
        if (this.user.admin) {
          this.loadActiveMembers();
          this.loadPlan();
        }
      }
    })*/


    if (this.user.admin) {
      this.loadActiveMembers();
      this.loadPlan();
      this.loadCard();

    }

  }


  loadActiveMembers() {

    this.isLoading = true;

    this.teamService.getTeamMembers(this.user.idUser, this.user.idGroup, this.accountService.getToken()).subscribe(res => {
      this.activeUsers = res.length;
      this.currentPlanValue = this.activeUsers * 12;
      this.isLoading = false;
    }, _err => {
      this.isLoading = false;
    })
  }

  changePlan() {

    this.dialog.open(ChangePlanComponent);

  }

  loadPlan() {

    this.isLoadingPlan = true;

    this.planService.getPlan(this.user.idUser, this.accountService.getToken()).subscribe(res => {
      this.plan = res;
      this.isLoadingPlan = false;
    }, _err => {
      this.isLoadingPlan = false;
    })

  }


  loadCard() {
    this.isLoadingCard = true;
    this.cardService.getCard(this.user.idUser, this.accountService.getToken()).subscribe(res => {
      this.card = res;
      this.isLoadingCard = false;
    }, _err => {
      this.isLoadingCard = false;
    })

  }

  confirmDelete() {

    this.dialog.open(DeleteCardComponent,
      {
        data: {
          idUser: this.user.idUser
        }
      })

  }

  cancelSubscribe(){

    this.isLoading = true;

    this.cardService.cancelSubscribe(this.user.idUser, this.card.idSub, this.accountService.getToken()).subscribe(res=>{

      console.log(res);

      this.isLoading = false;
    }, _err=>{
      console.log(_err);
      this.isLoading = false;
    })
  }

}
