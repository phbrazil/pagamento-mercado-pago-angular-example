import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ConfirmPasswordComponent } from './components/confirm-password/confirm-password.component';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Opportunity';
  user: User;
  key: string = '';

  constructor(private accountService: AccountService, private route: ActivatedRoute, private dialog: MatDialog) {

    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {

    //VERIFICA ROTA E DIRECIONA PARA NEW PASSWORD
    this.route.queryParams
      .subscribe(params => {
        if(params.key){
          if (this.user == null) {
            this.key = params.key;
            this.dialog.open(ConfirmPasswordComponent)
          }else{
            this.accountService.logout();
            this.key = params.key;
            this.dialog.open(ConfirmPasswordComponent)
          }
        }
      }
      );
  }

}
