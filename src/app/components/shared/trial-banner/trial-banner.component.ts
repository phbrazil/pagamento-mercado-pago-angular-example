import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
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

  constructor(private accountService: AccountService, private timeService: TimeService) {

    this.accountService.user.subscribe(x => this.user = x);

   }

  ngOnInit(): void {

    var date1 = new Date(this.today);
    var date2 = new Date(this.timeService.convertDDMMYYYToYYYYMMDD(this.user.trialDate));

    var Difference_In_Time = date2.getTime() - date1.getTime();

    this.daysLeft = Math.round(Difference_In_Time / (1000 * 3600 * 24));

  }

}
