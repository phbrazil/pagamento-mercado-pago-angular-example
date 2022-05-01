import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Roles } from 'src/app/_models/roles';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { RolesService } from 'src/app/_services/roles.service copy';

@Component({
  selector: 'app-change-plan',
  templateUrl: './change-plan.component.html',
  styleUrls: ['./change-plan.component.scss']
})
export class ChangePlanComponent implements OnInit {

  roles: Roles;
  user: User;

  isLoading: boolean = false;

  isRefund: boolean = false;
  isAdvance: boolean = false;
  isTime: boolean = false;

  constructor(private rolesService: RolesService, private accountService: AccountService,
    private dialog: MatDialog) {

    this.accountService.user.subscribe(x => this.user = x);

   }

  ngOnInit(): void {

    this.loadRoles();
  }

  loadRoles(){
    this.isLoading = true;
    this.rolesService.getRoles(this.user.idUser, this.accountService.getToken()).subscribe(roles=>{

      this.roles = roles;

      this.isLoading = false;

      this.checkCurrentPlan(roles);

      console.log(roles)

    }, _err=>{
      this.isLoading = false;
    })
  }

  close(){
    this.dialog.closeAll();
  }

  onSubmit(){

  }

  checkIsRefund(){
    this.isRefund = !this.isRefund;
  }

  checkIsTime(){
    this.isTime = !this.isTime;
  }

  checkIsAdvance(){
    this.isAdvance = !this.isAdvance;
  }

  checkCurrentPlan(roles: Roles){

    this.isAdvance = roles.enableAdvance;
    this.isTime = roles.enableTime;
    this.isRefund = roles.enableRefund;

  }

}
