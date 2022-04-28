import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-trial-banner',
  templateUrl: './trial-banner.component.html',
  styleUrls: ['./trial-banner.component.scss']
})
export class TrialBannerComponent implements OnInit {

  user: User;

  daysLeft: number = 7;

  constructor(private accountService: AccountService) {

    this.accountService.user.subscribe(x => this.user = x);

   }

  ngOnInit(): void {
  }

}
