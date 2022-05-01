import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { Roles } from 'src/app/_models/roles';
import { RolesService } from 'src/app/_services/roles.service copy';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  user: User;

  roles: Roles;

  faUser = faUser;
  faBars = faBars;

  navColor: string = 'nav-green';

  name: string = '';


  constructor(private accountService: AccountService,
    private rolesService: RolesService) {

    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {

    //CHECK USER ROLES
    this.rolesService.getRoles(this.user.idUser, this.accountService.getToken()).subscribe(roles => {

      this.rolesService.setRoles(roles);
      this.roles = roles;

    }, _err => {
      this.accountService.logout();
    });

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
