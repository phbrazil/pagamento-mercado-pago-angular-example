import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Constants } from 'src/app/components/shared/utils/Constants';
import { Plan } from 'src/app/_models/plan';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { PlanService } from 'src/app/_services/plan.service';
import { TeamService } from 'src/app/_services/team.service';
import { NewCardComponent } from '../new-card/new-card.component';

@Component({
  selector: 'app-change-plan',
  templateUrl: './change-plan.component.html',
  styleUrls: ['./change-plan.component.scss']
})
export class ChangePlanComponent implements OnInit {


  faMinus = faMinus;
  faPlus = faPlus;

  plan: Plan;
  user: User;
  activeUsers: number;
  currentPlanValue: number

  isLoading: boolean = false;

  isRefund: boolean = false;
  isAdvance: boolean = false;
  isTime: boolean = true;

  constructor(private planService: PlanService, private accountService: AccountService,
    private dialog: MatDialog, private teamService: TeamService) {

    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {

    this.loadRoles();

    this.loadActiveMembers();

  }

  loadRoles() {
    this.isLoading = true;
    this.planService.getPlan(this.user.idUser, this.accountService.getToken()).subscribe(plan => {

      this.plan = plan;

      this.isLoading = false;

      this.checkCurrentPlan(plan);

    }, _err => {
      this.isLoading = false;
    })
  }

  close() {
    this.dialog.closeAll();
  }

  checkIsRefund() {

    this.isRefund = !this.isRefund;

    this.plan.enableRefund = this.isRefund;

    this.calcPricing(this.plan.plan);
  }

  checkIsTime() {

    this.isTime = !this.isTime;

    this.plan.enableTime = this.isTime;


    this.calcPricing(this.plan.plan);

  }

  checkIsAdvance() {

    this.isAdvance = !this.isAdvance;

    this.plan.enableAdvance = this.isAdvance;

    this.calcPricing(this.plan.plan);

  }

  checkCurrentPlan(plan: Plan) {

    this.isAdvance = plan.enableAdvance;
    this.isTime = plan.enableTime;
    this.isRefund = plan.enableRefund;

  }

  loadActiveMembers() {

    this.isLoading = true;

    this.teamService.getTeamMembers(this.user.idUser, this.user.idGroup, this.accountService.getToken()).subscribe(res => {
      this.activeUsers = res.length;
      this.currentPlanValue = this.activeUsers * 12;
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
    })
  }

  calcPricing(plan: string) {

    let multiply = plan == 'Pro' ? Constants.multiplyPro : Constants.multiplyCorp;

    this.isTime ? multiply = multiply + 5 : multiply = multiply - 0;
    this.isAdvance ? multiply = multiply + 5 : multiply = multiply - 0;
    this.isRefund ? multiply = multiply + 5 : multiply = multiply - 0;

    if (this.isAdvance || this.isRefund || this.isTime) {
      this.currentPlanValue = this.activeUsers * multiply;
    } else {
      this.currentPlanValue = 0;
    }

  }

  selectPro() {

    this.plan.plan = 'Pro';

    this.calcPricing(this.plan.plan);

  }

  selectCorp() {

    this.plan.plan = 'Corp';

    this.calcPricing(this.plan.plan);

  }

  decreaseUser() {

    if (this.activeUsers > 0) {

      this.activeUsers--;

    }

    this.calcPricing(this.plan.plan);


  }

  increaseUser() {

    if (this.activeUsers < 20) {

      this.activeUsers++;

    }


    this.calcPricing(this.plan.plan);

  }

  addUser(event: any) {

    this.activeUsers = event.target.value;

    this.calcPricing(this.plan.plan);

  }

  onSubmit() {

    this.isLoading = true;

    this.plan.idUser = this.user.idUser;

    this.planService.changePlan(this.plan, this.plan.idPlan, this.accountService.getToken()).subscribe(res => {

      this.isLoading = false;

      this.planService.setIsReload(true);

      this.planService.setPlan(res);

      this.close();

      this.newCard();

    }, _err => {

      this.isLoading = false;

    })

  }

  newCard() {
    this.dialog.open(NewCardComponent,
      {
        disableClose: true,
        data: {
          activeUsers: this.activeUsers,
          currentPlanValue: this.currentPlanValue
        }
      });

  }

}
