import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from 'src/app/_services/account.service';
import { AlertService } from 'src/app/_services/alert.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  text: string = '';
  subText: string = '';
  messageType: string = '';

  formRegister = this.fb.group({
    email: ['', Validators.required],
    name: ['', Validators.required],
    password: ['', Validators.required],
    phone: ['', Validators.required],
  });

  constructor(public dialog: MatDialog, private fb: FormBuilder, private alertService: AlertService,
    private accountService: AccountService) { }

  isRegistering: boolean = false;

  ngOnInit() {

  }

  close() {
    this.dialog.closeAll();
  }


  send() {

    this.isRegistering = true;

    this.text = 'Aguarde enquanto nossos servidores iniciem';
    this.messageType = 'success';

  }

  login() {

    this.close();

    this.dialog.open(LoginComponent);

  }

  createAccount() {

    this.isRegistering = true;

    this.accountService.register(this.formRegister.value).subscribe(res =>{

      this.text = '';
      this.subText = '';
      if(res.message.code == 401 && res.message.text == 'Email já está em uso'){
        this.text  = res.message.text;
        this.subText  = res.message.subText;
        this.messageType = 'danger';
      }else{
        this.text  = res.message.text;
        this.subText  = res.message.subText;
        this.messageType = 'success';
        this.formRegister.reset();
      }

      this.isRegistering = false;

      console.log(res);

    }, err =>{
      console.log(err)
      this.isRegistering = false;

    })

    console.log(this.formRegister.value)
  }

}
