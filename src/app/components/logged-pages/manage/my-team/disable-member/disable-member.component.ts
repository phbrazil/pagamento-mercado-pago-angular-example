import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { TeamService } from 'src/app/_services/team.service';

@Component({
  selector: 'app-disable-member',
  templateUrl: './disable-member.component.html',
  styleUrls: ['./disable-member.component.scss']
})
export class DisableMemberComponent implements OnInit {

  isLoading: boolean = false;

  user: User;

  constructor(@Inject(MAT_DIALOG_DATA) public userDisable: any,
  public dialog: MatDialog, private teamService: TeamService,
  private accountService: AccountService) {

    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {

  }

  close() {
    this.dialog.closeAll();
  }

  disableUser(){

    this.isLoading = true;

    this.teamService.disableUser(this.user.idUser, this.userDisable.user.idUser, this.accountService.getToken()).subscribe(res=>{
      this.isLoading = false;
      this.accountService.setIsReloadMembers(true);
      this.close();
    }, _err=>{
      this.isLoading = false;
    })

  }

}
