import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.scss']
})
export class MoreInfoComponent implements OnInit {

  isLoading: boolean = false;

  idAdvance: number;
  constructor(@Inject(MAT_DIALOG_DATA) public advance: any, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.idAdvance = this.advance.idAdvance;

    console.log(this.idAdvance);
  }

  close(){
    this.dialog.closeAll()
  }

}
