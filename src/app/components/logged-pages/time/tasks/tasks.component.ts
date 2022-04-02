import { Component, Input, OnInit } from '@angular/core';
import { TimeTask } from 'src/app/_models/task';
import { User } from 'src/app/_models/user';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  @Input() user: User
  @Input() task: TimeTask

  constructor() { }

  ngOnInit(): void {

  }

}
