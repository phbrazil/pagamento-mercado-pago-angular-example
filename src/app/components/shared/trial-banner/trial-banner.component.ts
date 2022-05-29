import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { PlanService } from 'src/app/_services/plan.service';
import { TimeService } from 'src/app/_services/time.service';

@Component({
  selector: 'app-trial-banner',
  templateUrl: './trial-banner.component.html',
  styleUrls: ['./trial-banner.component.scss']
})
export class TrialBannerComponent implements OnInit {

  user: User;

  daysLeft: number = 7;

  day: Date = new Date();
  today = moment(new Date(this.day)).format('MM/DD/YYYY');

  expired: boolean = false;

  constructor(private accountService: AccountService, private timeService: TimeService,
    private planService: PlanService) {

    this.accountService.user.subscribe(x => this.user = x);

   }

  ngOnInit(): void {

   this.daysLeft = this.planService.getDaysLeft(this.user.trialDate);

   this.checkExpired(this.daysLeft);

   console.log(this.expired)

   console.log(this.daysLeft)
  }

  checkExpired(daysLeft: number){

    if(daysLeft <1 ){
      this.expired = true;
    }else{
      this.expired = false;
    }
  }

}
