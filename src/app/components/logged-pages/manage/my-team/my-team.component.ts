import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TableSortService } from 'src/app/components/shared/table-sort.service';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { NewMemberComponent } from './new-member/new-member.component';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.scss']
})
export class MyTeamComponent implements OnInit {

  faPlus = faPlus;
  user: User;
  isLoading: boolean = false;

  members: User[] = [];

  //DATATABLE
  dtOptions: DataTables.Settings = {};

  constructor(private accountService: AccountService, private dialog: MatDialog,
    private dataTableSettings: TableSortService) {

    this.accountService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {

    this.dtOptions = this.dataTableSettings.getSettings();

    this.accountService.getIsReloadMembers().subscribe(status => {
      if (status != null && status) {
        this.loadMembers();
      }
    })

    this.loadMembers();
  }

  newMember() {

    this.dialog.open(NewMemberComponent)

  }

  loadMembers(){

    this.accountService.setIsReloadMembers(false);

    this.isLoading = true;

    this.accountService.getTeamMembers(this.user.idUser, this.user.idGroup).subscribe(res=>{
      this.members = res;
      this.isLoading = false;

    }, _err =>{
      this.isLoading = false;
    })



  }

}
