import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { TaskService } from 'src/app/_services/task.service';

@Component({
  selector: 'app-new-task-manager',
  templateUrl: './new-task-manager.component.html',
  styleUrls: ['./new-task-manager.component.scss']
})
export class NewTaskManagerComponent implements OnInit {


  newTaskForm: FormGroup;

  isActive: boolean = true;

  isLoading: boolean = false;

  user: User;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private taskService: TaskService, private accountService: AccountService) {

    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {

    this.newTaskForm = this.fb.group({
      name: ['', Validators.required],
      isActive: [this.isActive, Validators.required],
      idGroup: [this.user.idGroup, Validators.required],
    });

  }

  close() {
    this.dialog.closeAll();
  }

  submit() {

    this.isLoading = true;

    this.taskService.newTask(this.newTaskForm.value, this.accountService.getToken()).subscribe(_res => {

      this.isLoading = false;

      this.taskService.setIsReload(true);

      this.close();

    }, _err => {

      this.isLoading = false;
    })

  }

  changeStatus() {
    this.isActive = !this.isActive;

    this.newTaskForm.patchValue({isActive: this.isActive});
  }

}
