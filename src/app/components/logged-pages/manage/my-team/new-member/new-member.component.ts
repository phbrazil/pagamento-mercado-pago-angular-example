import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-new-member',
  templateUrl: './new-member.component.html',
  styleUrls: ['./new-member.component.scss']
})
export class NewMemberComponent implements OnInit {

  newMemberForm: FormGroup;

  active: boolean = true;

  isLoading: boolean = false;

  user: User;

  constructor(private dialog: MatDialog, private fb: FormBuilder, private accountService: AccountService) {

    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {

    this.newMemberForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      active: [this.active, Validators.required],
      idGroup: [this.user.idGroup, Validators.required],
    });
  }

  close() {
    this.dialog.closeAll();
  }

  submit() {
    this.isLoading = true;

    this.accountService.createMemberAccount(this.newMemberForm.value, this.accountService.getToken()).subscribe(_res => {

      this.isLoading = false;

      this.accountService.setIsReloadMembers(true);

      this.close();

    }, _err => {
      this.isLoading = false;
    })


  }

  changeStatus() {
    this.active = !this.active;

    this.newMemberForm.patchValue({ active: this.active });

  }

}
