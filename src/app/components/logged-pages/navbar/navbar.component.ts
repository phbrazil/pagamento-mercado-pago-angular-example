import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  user: User;

  faUser = faUser;
  faBars = faBars;

  navColor: string = 'nav-green';

  name: string = '';


  constructor(private accountService: AccountService) {

    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {

    for (var i = 0; i < this.user.name.length; i++) {
      if (this.user.name.charAt(i) == ' ') {
        break
      }
      this.name = this.name + this.user.name.charAt(i);
    }
  }

  logout() {

    this.accountService.logout();

  }

}
