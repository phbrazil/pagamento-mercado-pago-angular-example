import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateAccountComponent } from '../create-account/create-account.component';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Constants } from '../shared/utils/Constants';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {


  faMinus = faMinus;
  faPlus = faPlus;

  //PRO PLAN
  usersPro: number = 0;
  totalPro: number = 0;
  isTimePro: boolean = true;
  isAdvancePro: boolean = false;
  isRefundPro: boolean = false;

  //CORP PLAN
  usersCorp: number = 0;
  totalCorp: number = 0;
  isTimeCorp: boolean = true;
  isAdvanceCorp: boolean = false;
  isRefundCorp: boolean = false;

  plan: string = ''

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  getOpportunity(plan: string) {
    this.dialog.open(CreateAccountComponent);
  }

  //PRO PLAN
  checkIsTimePro() {
    this.isTimePro = !this.isTimePro;
    this.calcPricingPro();
  }

  checkIsAdvancePro() {
    this.isAdvancePro = !this.isAdvancePro;
    this.calcPricingPro();
  }

  checkIsRefundPro() {
    this.isRefundPro = !this.isRefundPro;
    this.calcPricingPro();
  }

  addUserPro(event: any) {

    if (event.target.value > 20) {

      this.usersPro = 20;

    } else {

      this.usersPro = event.target.value;

    }

    this.calcPricingPro();

  }

  calcPricingPro() {

    let multiply = Constants.multiplyPro;

    this.isTimePro ? multiply = multiply + 5 : multiply = multiply - 0;
    this.isAdvancePro ? multiply = multiply + 5 : multiply = multiply - 0;
    this.isRefundPro ? multiply = multiply + 5 : multiply = multiply - 0;

    if (this.isAdvancePro || this.isRefundPro || this.isTimePro) {
      this.totalPro = this.usersPro * multiply;
    } else {
      this.totalPro = 0;
    }

  }

  decreaseUserPro() {

    if (this.usersPro > 0) {

      this.usersPro--;

    }

    this.calcPricingPro();


  }

  increaseUserPro() {

    if (this.usersPro < 20) {

      this.usersPro++;

    }


    this.calcPricingPro();

  }



  //CORP PLAN
  checkIsTimeCorp() {
    this.isTimeCorp = !this.isTimeCorp;
    this.calcPricingCorp();
  }

  checkIsAdvanceCorp() {
    this.isAdvanceCorp = !this.isAdvanceCorp;
    this.calcPricingCorp();
  }

  checkIsRefundCorp() {
    this.isRefundCorp = !this.isRefundCorp;
    this.calcPricingCorp();
  }

  addUserCorp(event: any) {

    this.usersCorp = event.target.value;

    this.calcPricingCorp();

  }

  calcPricingCorp() {

    let multiply = Constants.multiplyCorp;

    this.isTimeCorp ? multiply = multiply + 5 : multiply = multiply - 0;
    this.isAdvanceCorp ? multiply = multiply + 5 : multiply = multiply - 0;
    this.isRefundCorp ? multiply = multiply + 5 : multiply = multiply - 0;

    if (this.isAdvanceCorp || this.isRefundCorp || this.isTimeCorp) {
      this.totalCorp = this.usersCorp * multiply;
    } else {
      this.totalCorp = 0;
    }

  }

  decreaseUserCorp() {

    if (this.usersCorp > 0) {

      this.usersCorp--;

    }

    this.calcPricingCorp();


  }

  increaseUserCorp() {

    this.usersCorp++;

    this.calcPricingCorp();

  }
}
