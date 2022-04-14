import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { AlertService } from 'src/app/_services/alert.service';
import { CreateAccountComponent } from '../create-account/create-account.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  message: string = '';
  messageType: string = '';

  formLogin = this.fb.group({
    emailLogin: ['', Validators.required],
    passwordLogin: ['', Validators.required],
  });

  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private alertService: AlertService, public dialog: MatDialog, private router: Router,
    private accountService: AccountService) {

    }

  ngOnInit(): void {

  }

  enviar() {
    if (this.formLogin.invalid) {

      this.alertService.error('Dados incorretos', 'tente novamente', { keepAfterRouteChange: true });

    } else {

      this.postLogin(this.formLogin)

    }

  }

  postLogin(formLogin: FormGroup) {

    this.isLoading = true;

    this.accountService.login(formLogin.value.emailLogin, formLogin.value.passwordLogin).subscribe(res => {

      this.accountService.setUser(res);

      this.router.navigate(['/time']);
      this.close();

    }, err => {

      this.isLoading = false;

      this.message = 'Verifique seu email e senha';

      this.messageType = 'danger';

    })

  }

  close() {
    this.dialog.closeAll();
  }

  getOpportunity() {

    this.close();

    this.dialog.open(CreateAccountComponent);
  }

  resetPassword(){

    this.close();

    this.dialog.open(ResetPasswordComponent);


  }

}
