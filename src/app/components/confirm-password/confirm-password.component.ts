import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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

  firstName: string = 'Paulo';

  user: User;

  constructor(private dialog: MatDialog, private fb: FormBuilder, private accountService: AccountService) {

    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {

    this.newPassForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });

  }


  close() {

    console.log('cloquei')
    this.dialog.closeAll();
  }

  onSubmit() {

    this.isLoading = true;

  }

}
