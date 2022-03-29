import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(private fb: FormBuilder, private alertService: AlertService, public dialog: MatDialog) { }

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

    console.log(formLogin.value)

  }

  close() {
    this.dialog.closeAll();
  }

  getOpportunity() {

    this.close();

    this.dialog.open(CreateAccountComponent);
   }

}
