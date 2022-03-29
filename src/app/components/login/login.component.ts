import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { AlertService } from 'src/app/_services/alert.service';
import { CreateAccountComponent } from '../create-account/create-account.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin = this.fb.group({
    emailLogin: ['', Validators.required],
    passwordLogin: ['', Validators.required],
  });

  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private alertService: AlertService, public dialog: MatDialog,  private router: Router,
    private accountService: AccountService) { }

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

    console.log(formLogin)

    this.isLoading = true;

    this.accountService.login(formLogin.value.emailLogin, formLogin.value.passwordLogin).subscribe(res => {

      console.log(res)

      this.accountService.setUser(res);

      this.router.navigate(['/home']);
      this.close();

    }, err => {

    })

  }

  close() {
    this.dialog.closeAll();
  }

  getOpportunity() {

    this.close();

    this.dialog.open(CreateAccountComponent);
   }

}
