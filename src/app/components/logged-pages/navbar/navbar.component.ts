import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { Plan } from 'src/app/_models/plan';
import { PlanService } from 'src/app/_services/plan.service';
import { SettingsService } from 'src/app/_services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoading: boolean = false;

  user: User;

  plan: Plan;

  faUser = faUser;
  faBars = faBars;

  navColor: string = 'nav-green';

  name: string = '';


  constructor(private accountService: AccountService,
    private planService: PlanService,
    private settingsService: SettingsService) {

    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {

    //reload navbar if plan change
    this.planService.getIsReload().subscribe(status => {
      if (status != null && status) {
        if (this.user.admin) {
          this.getPlan();
        }
      }
    })

    this.getPlan();

    for (var i = 0; i < this.user.name.length; i++) {
      if (this.user.name.charAt(i) == ' ') {
        break
      }
      this.name = this.name + this.user.name.charAt(i);
    }

    this.loadColor();
  }

  logout() {

    this.accountService.logout();

  }

  getPlan() {
    //CHECK USER ROLES
    this.planService.getPlan(this.user.idUser, this.accountService.getToken()).subscribe(plan => {

      this.planService.setPlan(plan);
      this.plan = plan;

    }, _err => {
      this.accountService.logout();
    });
  }

  loadColor() {

   this.settingsService.getColor().subscribe(res =>{

    console.log(res)

    this.navColor = res;

   })

  }

}
