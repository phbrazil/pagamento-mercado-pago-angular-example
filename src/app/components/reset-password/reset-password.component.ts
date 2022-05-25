import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  formReset: FormGroup;

  isLoading = false;

  message: string = '';
  messageType: string = '';

  constructor(private fb: FormBuilder,
    private alertService: AlertService, private router: Router,
    private accountService: AccountService, public dialog: MatDialog) {

    }
  ngOnInit(): void {

    this.formReset = this.fb.group({
      emailReset: ['', [Validators.required, Validators.email]],
    })
  }

  enviar() {
    if (this.formReset.invalid) {

      this.alertService.error('Dados incorretos', 'tente novamente', { keepAfterRouteChange: true });

    } else {

      this.postReset(this.formReset)

    }

  }

  postReset(body: any){

    this.isLoading = true;

    this.accountService.resetPassword(body.value.emailReset).subscribe(_res =>{

      this.isLoading = false;

      this.formReset.reset();

      this.message = 'Senha redefinida, verifique sua caixa de e-mails';

      this.messageType = 'success';

    }, _err =>{

      this.isLoading = false;

      this.message = 'Verifique o email informado';

      this.messageType = 'danger';

    })

  }

  close() {
    this.dialog.closeAll();
  }



}
