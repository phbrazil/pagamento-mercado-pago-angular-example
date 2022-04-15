import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-new-task-manager',
  templateUrl: './new-task-manager.component.html',
  styleUrls: ['./new-task-manager.component.scss']
})
export class NewTaskManagerComponent implements OnInit {


  newTaskForm: FormGroup;

  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.newTaskForm = this.fb.group({
      name: ['', Validators.required],
      time: ['', Validators.required],
    });
  }

  close() {
    this.dialog.closeAll();
  }

}
