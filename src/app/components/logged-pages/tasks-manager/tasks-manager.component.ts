import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NewTaskManagerComponent } from './new-task-manager/new-task-manager.component';

@Component({
  selector: 'app-tasks-manager',
  templateUrl: './tasks-manager.component.html',
  styleUrls: ['./tasks-manager.component.scss']
})
export class TasksManagerComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  faPlus = faPlus;


  ngOnInit(): void {
  }

  newTaskManager(){
    this.dialog.open(NewTaskManagerComponent)
  }


}
