import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { TeamService } from 'src/app/_services/team.service';

@Component({
  selector: 'app-enable-member',
  templateUrl: './enable-member.component.html',
  styleUrls: ['./enable-member.component.scss']
})
export class EnableMemberComponent implements OnInit {

  isLoading: boolean = false;

  user: User

  constructor(@Inject(MAT_DIALOG_DATA) public userEnable: any,
  public dialog: MatDialog, private teamService: TeamService,
  private accountService: AccountService) {

    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {
  }

  close() {
    this.dialog.closeAll();
  }

  enableUser(){

    this.isLoading = true;

    this.teamService.enableUser(this.user.idUser, this.userEnable.user.idUser, this.accountService.getToken()).subscribe(res=>{
      this.isLoading = false;
      this.accountService.setIsReloadMembers(true);
      this.close();
    }, _err=>{
      this.isLoading = false;
    })

  }

}
