import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Roles } from 'src/app/_models/roles';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { RolesService } from 'src/app/_services/roles.service copy';

@Component({
  selector: 'app-new-member',
  templateUrl: './new-member.component.html',
  styleUrls: ['./new-member.component.scss']
})
export class NewMemberComponent implements OnInit {

  newMemberForm: FormGroup;

  active: boolean = true;

  isLoading: boolean = false;

  message: string = '';
  messageType: string = ''

  user: User;
  roles: Roles;

  constructor(private dialog: MatDialog, private fb: FormBuilder,
    private accountService: AccountService,
    private rolesService: RolesService) {

    this.accountService.user.subscribe(x => this.user = x);

    this.rolesService.roles.subscribe(x => this.roles = x);
  }

  ngOnInit(): void {

    console.log(this.roles)

    this.newMemberForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      active: [this.active, Validators.required],
      idGroup: [this.user.idGroup, Validators.required],
      trialDate: [this.user.trialDate, Validators.required ],
      trial: [this.user.trial, Validators.required ]
    });
  }

  close() {
    this.dialog.closeAll();
  }

  submit() {
    this.isLoading = true;

    this.accountService.createMemberAccount(this.newMemberForm.value, this.accountService.getToken(), this.user.idUser).subscribe(res => {

      this.isLoading = false;

      if (res.message.code == 409) {

        this.message = 'Esse email já foi adicionado como membro do time';
        this.messageType = 'danger';

      } else {

        //SAVE ROLES
        let newRoles = {
          idUser: res.idUser,
          enableTime: this.roles.enableTime,
          enableRefund: this.roles.enableRefund,
          enableAdvance: this.roles.enableAdvance
        };

        this.rolesService.newRoles(newRoles, this.accountService.getToken()).subscribe(_res => {

          this.message = '';
          this.messageType = '';
          this.accountService.setIsReloadMembers(true);

          this.close();

        }, _err => {

        })



      }



    }, _err => {
      this.isLoading = false;
    })


  }

  changeStatus() {
    this.active = !this.active;

    this.newMemberForm.patchValue({ active: this.active });

  }

}
