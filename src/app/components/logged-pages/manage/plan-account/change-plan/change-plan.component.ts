import { Component, Inject, LOCALE_ID, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Constants } from 'src/app/components/shared/utils/Constants';
import { Card } from 'src/app/_models/payment/card';
import { Plan } from 'src/app/_models/plan';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { CardService } from 'src/app/_services/card.service';
import { PlanService } from 'src/app/_services/plan.service';
import { TeamService } from 'src/app/_services/team.service';
import { NewCardComponent } from '../new-card/new-card.component';
import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { AlertService } from 'src/app/_services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-plan',
  templateUrl: './change-plan.component.html',
  styleUrls: ['./change-plan.component.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class ChangePlanComponent implements OnInit {


  faMinus = faMinus;
  faPlus = faPlus;

  plan: Plan;
  user: User;
  activeUsers: number = 1;
  currentPlanValue: number
  currentPlanName: string

  isLoading: boolean = false;
  isModalCard: boolean = false;

  isRefund: boolean = false;
  isAdvance: boolean = false;
  isTime: boolean = true;

  card: Card;

  constructor(private planService: PlanService, private accountService: AccountService,
    private dialog: MatDialog, private teamService: TeamService,
    private cardService: CardService,
    @Inject(LOCALE_ID) private locale: string,
    private alertService: AlertService,
    private router: Router) {

    this.accountService.user.subscribe(x => this.user = x);

    //this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }

  ngOnInit(): void {

    this.loadActiveMembers();

  }

  loadPlan() {
    this.isLoading = true;
    this.planService.getPlan(this.user.idUser, this.accountService.getToken()).subscribe(plan => {

      this.plan = plan;

      this.checkCurrentPlan(plan);

      this.currentPlanValue = this.planService.calcPricing(this.plan, this.activeUsers);

      this.loadCard();

    }, _err => {
      this.isLoading = false;
    })
  }

  loadCard() {

    this.isLoading = true;

    this.cardService.getCard(this.user.idUser, this.accountService.getToken()).subscribe(res => {
      this.card = res;
      this.isLoading = false;

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

    this.currentPlanValue = this.planService.calcPricing(this.plan, this.activeUsers);
  }

  checkIsTime() {

    this.isTime = !this.isTime;

    this.plan.enableTime = this.isTime;


    this.currentPlanValue = this.planService.calcPricing(this.plan, this.activeUsers);

  }

  checkIsAdvance() {

    this.isAdvance = !this.isAdvance;

    this.plan.enableAdvance = this.isAdvance;

    this.currentPlanValue = this.planService.calcPricing(this.plan, this.activeUsers);

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

      this.loadPlan();

      //this.isLoading = false;

    }, _err => {
      this.isLoading = false;
    })
  }


  selectPro() {

    this.plan.plan = 'Pro';

   this.currentPlanValue = this.planService.calcPricing(this.plan, this.activeUsers);

  }

  selectCorp() {

    this.plan.plan = 'Corp';

    this.currentPlanValue = this.planService.calcPricing(this.plan, this.activeUsers);

  }

  decreaseUser() {

    if (this.activeUsers > 0) {

      this.activeUsers--;

    }

    this.currentPlanValue = this.planService.calcPricing(this.plan, this.activeUsers);

  }

  increaseUser() {

    if (this.activeUsers < 20) {

      this.activeUsers++;

    }

    this.currentPlanValue = this.planService.calcPricing(this.plan, this.activeUsers);

  }

  addUser(event: any) {

    this.activeUsers = event.target.value;

    this.currentPlanValue = this.planService.calcPricing(this.plan, this.activeUsers);

  }

  //adicionar novo plano
  onSubmit() {


    this.isLoading = true;

    this.plan.idUser = this.user.idUser;

    this.planService.changePlan(this.plan, this.plan.idPlan, this.accountService.getToken()).subscribe(res => {

      this.isLoading = false;

      this.planService.setPlan(res);

      this.close();

      this.newCard();

    }, _err => {

      this.isLoading = false;

    })

  }

  //atualizar valor da assinatura mensal
  updateSubscribe() {

    this.isLoading = true;

    this.plan.idUser = this.user.idUser;

    this.planService.changePlan(this.plan, this.plan.idPlan, this.accountService.getToken()).subscribe(res => {

      this.planService.setPlan(res);
      this.planService.setIsReload(true);

      this.isLoading = false;

      this.close();

      let newPrice = formatCurrency(this.currentPlanValue, this.locale, getCurrencySymbol('BRL', 'wide'));

      this.alertService.success('Assinatura Atualizada', 'O valor de sua mensalidade será de ' + newPrice,  { autoClose: true, keepAfterRouteChange: true });

      //this.router.navigate(['/manage'])

    }, err => {

      this.isLoading = false;

    })

  }

  newCard() {

    this.isModalCard = true;

    this.dialog.open(NewCardComponent,
      {
        disableClose: true,
        data: {
          activeUsers: this.activeUsers,
          currentPlanValue: this.currentPlanValue,
          plan: this.plan
        }
      });

  }

}
