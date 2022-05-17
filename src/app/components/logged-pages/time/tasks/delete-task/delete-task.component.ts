import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Constants } from 'src/app/components/shared/utils/Constants';
import { AccountService } from 'src/app/_services/account.service';
import { AlertService } from 'src/app/_services/alert.service';
import { TimeService } from 'src/app/_services/time.service';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.scss']
})
export class DeleteTaskComponent implements OnInit {

  constructor(public dialog: MatDialog, private timeService: TimeService, private accountService: AccountService,
        @Inject(MAT_DIALOG_DATA) public task: any, private alertService: AlertService) { }

  isLoading: boolean = false;

  ngOnInit() {

  }

  close() {
    this.dialog.closeAll();
  }

  deleteEntry(){

    this.isLoading = true;

    this.timeService.deleteEntry(this.task.task.idTask, this.accountService.getToken()).subscribe(_res =>{

      this.isLoading = false;

      this.timeService.setIsReload(true);

      this.close();

      this.alertService.success('Registro deletado', 'Registro deletado com sucesso', { autoClose: true });

    }, _err =>{
      this.isLoading = false;
      this.alertService.error(Constants.errorTittle, Constants.errorMessage);

    })


  }


}
