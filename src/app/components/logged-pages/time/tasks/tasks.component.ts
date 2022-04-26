import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TimeTask } from 'src/app/_models/time-task';
import { User } from 'src/app/_models/user';
import { DeleteTaskComponent } from './delete-task/delete-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  @Input() user: User
  @Input() task: TimeTask
  @Input() disableButtons: boolean = false;
  @Input() showDate: boolean = false;
  @Input() size: string = '';

  constructor(public dialog: MatDialog) { }

  ngOnInit() {

  }

  edit() {

    this.dialog.open(EditTaskComponent,
      {
        data: {
          task: this.task
        }
      })


  }

  delete() {

    this.dialog.open(DeleteTaskComponent,
      {
        data: {
          task: this.task
        }
      })

  }


}
