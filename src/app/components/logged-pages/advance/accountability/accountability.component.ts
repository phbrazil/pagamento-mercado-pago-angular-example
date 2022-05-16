import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-accountability',
  templateUrl: './accountability.component.html',
  styleUrls: ['./accountability.component.scss']
})
export class AccountabilityComponent implements OnInit {

  isLoading: boolean = false;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  close() {
    this.dialog.closeAll()
  }

}
