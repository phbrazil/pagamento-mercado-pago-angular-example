import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/_services/alert.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  formRegister = this.fb.group({
    email: ['', Validators.required],
    name: ['', Validators.required],
    phone: ['', Validators.required],

    /*address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),*/
  });

  constructor(public dialog: MatDialog, private fb: FormBuilder, private alertService: AlertService) { }

  isRegistering: boolean = false;

  ngOnInit(): void {


  }

  close() {
    this.dialog.closeAll();
  }


  send() {

    console.log('to aqui')
    this.isRegistering = true;

    this.alertService.success('TEXTO 1', 'SUBTEXTO', { keepAfterRouteChange: true });


  }

  login(){

    this.close();

    this.dialog.open(LoginComponent);

  }

}
