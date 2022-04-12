import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TimeTask } from 'src/app/_models/task';
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

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  edit() {

    this.dialog.open(EditTaskComponent)


  }

  delete() {

    this.dialog.open(DeleteTaskComponent)

  }


}
