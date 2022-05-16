import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { faPlus, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { TableSortService } from 'src/app/components/shared/table-sort.service';
import { Plan } from 'src/app/_models/plan';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { PlanService } from 'src/app/_services/plan.service';
import { NewMemberComponent } from './new-member/new-member.component';
import { DisableMemberComponent } from './disable-member/disable-member.component';
import { TeamService } from 'src/app/_services/team.service';
import { EnableMemberComponent } from './enable-member/enable-member.component';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.scss']
})
export class MyTeamComponent implements OnInit {

  //tooltip
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[3]);

  faPlus = faPlus;
  faActive = faThumbsUp;
  faInactive = faThumbsDown;

  user: User;
  isLoading: boolean = false;
  isLoadingPlan: boolean = false;
  isLoadingMember: boolean = false;

  plan: Plan;

  members: User[] = [];

  tooltipMessage: string = ''

  //DATATABLE
  dtOptions: DataTables.Settings = {};

  constructor(private accountService: AccountService, private dialog: MatDialog,
    private dataTableSettings: TableSortService,
    private planService: PlanService,
    private teamService: TeamService) {

    this.accountService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {

    this.dtOptions = this.dataTableSettings.getSettings();

    this.accountService.getIsReloadMembers().subscribe(status => {
      if (status != null && status) {
        this.loadMembers();
      }
    })

    if(this.user.admin)
    this.loadPlan();

  }

  newMember() {

    this.dialog.open(NewMemberComponent)

  }

  loadMembers() {

    this.accountService.setIsReloadMembers(false);

    this.isLoading = true;

    this.teamService.getTeamMembers(this.user.idUser, this.user.idGroup, this.accountService.getToken()).subscribe(res => {
      this.members = res;
      this.isLoading = false;

      if (this.user?.trial && this.members.length == 10) {
        this.tooltipMessage = 'Durante a avaliação você só pode adicionar até 10 membros';
      } else if (this.plan.plan == 'Pro' && this.members.length == 20) {
        this.tooltipMessage = 'Seu plano atual só permite até 10 membros';
      }

    }, _err => {
      this.isLoading = false;
    })
  }

  loadPlan() {
    this.isLoadingPlan = true;
    this.planService.getPlan(this.user.idUser, this.accountService.getToken()).subscribe(res => {
      this.plan = res;
      this.isLoadingPlan = false;
      this.loadMembers();
    }, _err => {
      this.isLoadingPlan = false;
    })
  }

  disableMember(idUser: number) {

    this.isLoadingMember = true;

    this.accountService.getUserById(idUser).subscribe(user =>{
      this.isLoadingMember = false;

      this.dialog.open(DisableMemberComponent,
        {
          data: {
            user: user
          }
        })

    }, _err =>{
      this.isLoadingMember = false;
    });
  }

  enableMember(idUser: number) {

    this.isLoadingMember = true;

    this.accountService.getUserById(idUser).subscribe(user =>{
      this.isLoadingMember = false;

      this.dialog.open(EnableMemberComponent,
        {
          data: {
            user: user
          }
        })

    }, _err =>{
      this.isLoadingMember = false;
    });
  }

}
