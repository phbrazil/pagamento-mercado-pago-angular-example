import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  table: any;

  tabela: any[]= [];

  constructor(public dialog: MatDialog, private dataTableSettings: TableSortService) { }

  ngOnInit(): void {

    this.dtOptions = this.dataTableSettings.getSettings();


  }

  newAdvance(){
    this.dialog.open(NewAdvanceComponent)
  }

}
