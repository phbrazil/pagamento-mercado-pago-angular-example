import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.scss']
})
export class ConfirmPasswordComponent implements OnInit {

  newPassForm: FormGroup;

  isLoading: boolean = false;
  isLogging: boolean = false;

  firstName: string = '';

  validationCode: string = '';

  user: User;

  constructor(private dialog: MatDialog, private fb: FormBuilder, private accountService: AccountService,
    @Inject(MAT_DIALOG_DATA) public parameters: any, private router: Router) {

    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {

    this.validationCode = this.parameters.validationCode;

    this.loadUser();

    this.createForm();

  }


  createForm() {
    this.newPassForm = this.fb.group({
      email: [this.user?.email, Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      validationCode: [this.validationCode, Validators.required]
    });
  }

  close() {
    this.dialog.closeAll();
  }

  onSubmit() {

    this.isLoading = true;
    this.isLogging = true;

    this.accountService.createNewPassword(this.newPassForm.value).subscribe(_res => {

      this.isLoading = false;

      this.accountService.login(this.newPassForm.value.email, this.newPassForm.value.password).subscribe(res =>{

        this.isLogging = false;

        this.accountService.setUser(res);

        this.accountService.setIsLogged(true);

        this.router.navigate(['/time']);
        this.close();

      }, _err=>{
        this.isLogging = false;
      })


    }, _err => {

      this.isLoading = false;

    })

  }

  loadUser() {

    this.isLoading = true;

    this.accountService.getPendingPassword(this.validationCode).subscribe(res => {

      for (var i = 0; i < res.name.length; i++) {
        if (res.name.charAt(i) == ' ') {
          break
        }
        this.firstName = this.firstName + res.name.charAt(i);
      }

      this.newPassForm.patchValue({ email: res.email })

      this.isLoading = false;

    }, _err => {
      this.isLoading = false;
      this.close();
    })

  }

}
