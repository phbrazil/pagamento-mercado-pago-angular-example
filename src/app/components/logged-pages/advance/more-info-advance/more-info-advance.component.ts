import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Advance, AdvanceStatus } from 'src/app/_models/advance';
import { AccountService } from 'src/app/_services/account.service';
import { AdvanceService } from 'src/app/_services/advance.service';
import { AccountabilityComponent } from '../accountability/accountability.component';

@Component({
  selector: 'app-more-info-advance',
  templateUrl: './more-info-advance.component.html',
  styleUrls: ['./more-info-advance.component.scss']
})
export class MoreInfoComponentAdvance implements OnInit {

  isLoading: boolean = false;

  idAdvance: number;

  advance: Advance;


  //ENUM
  advanceStatus = AdvanceStatus;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private advanceService: AdvanceService,
  private accountService: AccountService) { }

  ngOnInit(): void {

    this.idAdvance = this.data.idAdvance;

    this.getAdvance();

  }

  close() {
    this.dialog.closeAll()
  }

  accountability() {

    this.close();

    this.dialog.open(AccountabilityComponent,
      {
        data: {
          idAdvance: this.idAdvance,
        }
      });

  }

  getAdvance(){

    this.isLoading = true;

    this.advanceService.getAdvance(this.idAdvance, this.accountService.getToken()).subscribe(res=>{
      this.advance = res;
      this.isLoading = false;
    },_err =>{
      this.isLoading = false;
    })
  }

  getStatus(status: string): string{

    return this.advanceService.getStatus(status);

  }

}
