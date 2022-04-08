import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Advance } from 'src/app/_models/advance';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
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

  table: Advance[]= [];

  advance: Advance;

  user: User;

  constructor(public dialog: MatDialog, private dataTableSettings: TableSortService, private accountService: AccountService) {

    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {

    this.dtOptions = this.dataTableSettings.getSettings();

    for(var i = 1;i<100;i++){

      this.advance = {idAdvance: 1, project: '000'+i, user: this.user, date: '29-01-1990', value: 200.00, status: 'Pendente' }

      this.table.push(this.advance)


    }


  }

  newAdvance(){
    this.dialog.open(NewAdvanceComponent)
  }

}
