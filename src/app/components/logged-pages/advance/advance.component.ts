import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Advance } from 'src/app/_models/advance';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { AdvanceService } from 'src/app/_services/advance.service';
import { TableSortService } from '../../shared/table-sort.service';
import { NewAdvanceComponent } from './new-advance/new-advance.component';

@Component({
  selector: 'app-advance',
  templateUrl: './advance.component.html',
  styleUrls: ['./advance.component.scss']
})
export class AdvanceComponent implements OnInit {

  //DATATABLE
  dtOptions: DataTables.Settings = {};

  faPlus = faPlus;

  advances: Advance[]= [];

  advance: Advance;

  user: User;

  isLoading: boolean = false;

  constructor(public dialog: MatDialog, private dataTableSettings: TableSortService, private accountService: AccountService,
    private advanceService: AdvanceService) {

    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {

    this.dtOptions = this.dataTableSettings.getSettings();

    this.advanceService.getIsReload().subscribe(status => {
      if (status != null && status) {
          this.loadAdvances();
      }
    })

    this.loadAdvances();

  }

  newAdvance(){
    this.dialog.open(NewAdvanceComponent)
  }

  loadAdvances(){

    this.isLoading = true;

    this.advanceService.getAllAdvances(this.user.idUser, this.accountService.getToken()).subscribe(res=>{
      this.advances = res;
      this.isLoading = false;
    }, _err =>{
      this.isLoading = false;
    })

  }

  getStatus(status: string): string{

    return this.advanceService.getStatus(status);

  }

}
