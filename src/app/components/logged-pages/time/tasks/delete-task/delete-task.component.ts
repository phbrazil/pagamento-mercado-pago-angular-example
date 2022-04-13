import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { TimeService } from 'src/app/_services/time.service';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.scss']
})
export class DeleteTaskComponent implements OnInit {

  constructor(public dialog: MatDialog, private timeService: TimeService, private accountService: AccountService,
        @Inject(MAT_DIALOG_DATA) public task: any, private router: Router) { }

  isLoading: boolean = false;

  ngOnInit(): void {

    console.log(this.task.task)
  }

  close() {
    this.dialog.closeAll();

    this.router.navigateByUrl('/reload', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/time'])
    );
  }

  deleteEntry(){

    this.isLoading = true;

    this.timeService.deleteEntry(this.task.task.idTask, this.accountService.getToken()).subscribe(res =>{

      this.isLoading = false;

      this.close();


    }, err =>{
      this.isLoading = false;

    })


  }


}
