import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateAccountComponent } from '../create-account/create-account.component';


@Component({
  selector: 'app-try-free',
  templateUrl: './try-free.component.html',
  styleUrls: ['./try-free.component.scss']
})
export class TryFreeComponent implements OnInit {


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  getOpportunity() {
   this.dialog.open(CreateAccountComponent);
  }

}
