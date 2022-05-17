import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdvanceService } from 'src/app/_services/advance.service';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user';
import { ReceiptAdvance } from 'src/app/_models/receiptAdvance';

@Component({
  selector: 'app-accountability',
  templateUrl: './accountability.component.html',
  styleUrls: ['./accountability.component.scss']
})
export class AccountabilityComponent implements OnInit {

  isLoading: boolean = false;

  user: User;

  receipts: ReceiptAdvance[] = [];

  constructor(private dialog: MatDialog, private advanceService: AdvanceService,
    @Inject(MAT_DIALOG_DATA) public data: any, private accountService: AccountService) {

      this.accountService.user.subscribe(x => this.user = x);

    }

  ngOnInit(): void {

    this.loadReceipts();
  }

  close() {
    this.dialog.closeAll()
  }

  loadReceipts(){

    this.isLoading = true;

    this.advanceService.getAllReceiptAd(this.data.idAdvance, this.user.idUser, this.accountService.getToken()).subscribe(res =>{

      this.receipts = res;

      this.isLoading = false;

    }, _err =>{
      this.isLoading = false;
    })

  }

}
