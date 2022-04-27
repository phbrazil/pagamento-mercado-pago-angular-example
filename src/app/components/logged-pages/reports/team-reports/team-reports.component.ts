import { Component, OnInit } from '@angular/core';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { TableSortService } from 'src/app/components/shared/table-sort.service';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { TeamService } from 'src/app/_services/team.service';

@Component({
  selector: 'app-team-reports',
  templateUrl: './team-reports.component.html',
  styleUrls: ['./team-reports.component.scss']
})
export class TeamReportsComponent implements OnInit {

  hoveredDate: NgbDate | null = null;

  user: User;

  fromDate: NgbDate;
  toDate: NgbDate | null = null;
  isOpenCalendar: boolean = false;

  isLoading: boolean = false;

  faActive = faThumbsUp;
  faInactive = faThumbsDown;

  team: any[] = []

  dtOptions: DataTables.Settings = {};

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    if (this.toDate != null) {

      this.isOpenCalendar = false;

      this.loadTeamReport();

    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {

    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);

  }

  constructor(calendar: NgbCalendar, private accountService: AccountService,
    private dataTableSettings: TableSortService,
    private teamService: TeamService) {
    this.fromDate = calendar.getPrev(calendar.getToday(), 'd', 10);
    this.toDate = calendar.getToday();
    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {

    this.dtOptions = this.dataTableSettings.getSettings();

    this.loadTeamReport();

  }

  loadTeamReport(){

    this.isLoading = true;

    let startDate = this.fromDate.day + '-' + this.fromDate.month + '-' + this.fromDate.year;
    let endDate = this.toDate.day + '-' + this.toDate.month + '-' + this.toDate.year;

    this.teamService.getTeamReport(this.user.idUser, this.user.idGroup, startDate, endDate,
      this.accountService.getToken()).subscribe(res=>{

        console.log(res)
      this.team = res;
      this.isLoading = false;
    }, _err =>{
      this.isLoading = false;
    })

  }

  openCalendar() {
    this.isOpenCalendar = true;
  }

}
