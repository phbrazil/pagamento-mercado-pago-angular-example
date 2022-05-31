import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { AlertService } from 'src/app/_services/alert.service';
import { CardService } from 'src/app/_services/card.service';

@Component({
  selector: 'app-delete-card',
  templateUrl: './delete-card.component.html',
  styleUrls: ['./delete-card.component.scss']
})
export class DeleteCardComponent implements OnInit {

  isLoading: boolean = false;

  user: User;

  constructor(private dialog: MatDialog, private cardService: CardService, @Inject(MAT_DIALOG_DATA) public data: any,
    private accountService: AccountService, private router: Router, private alertService: AlertService) {

    this.accountService.user.subscribe(x => this.user = x);

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }

  ngOnInit(): void {
  }

  close() {
    this.dialog.closeAll();
  }


  deleteCard() {
    this.isLoading = true;

    this.cardService.deleteCard(this.data.idUser, this.accountService.getToken()).subscribe(res => {
      this.isLoading = false;
      this.cardService.setIsReload(true);

      this.alertService.success('Cartão removido com sucesso', '', { autoClose: true });

      this.close();

      this.router.navigate(['/manage']);

      //set trial locally
      this.user.trial = true;

      this.accountService.setUser(this.user);
      localStorage.setItem('user', JSON.stringify(this.user));

    }, _err => {
      this.isLoading = false;
    })
  }

}
