import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { TaskService } from 'src/app/_services/task.service';

@Component({
  selector: 'app-new-task-manager',
  templateUrl: './new-task-manager.component.html',
  styleUrls: ['./new-task-manager.component.scss']
})
export class NewTaskManagerComponent implements OnInit {

  faPencil = faPencil;

  newTaskForm: FormGroup;

  active: boolean = true;

  isLoading: boolean = false;

  user: User;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private taskService: TaskService, private accountService: AccountService) {

    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {

    this.newTaskForm = this.fb.group({
      name: ['', Validators.required],
      active: [this.active, Validators.required],
      idGroup: [this.user.idGroup, Validators.required],
    });

  }

  close() {
    this.dialog.closeAll();
  }

  submit() {

    this.isLoading = true;

    this.taskService.newTask(this.newTaskForm.value, this.user.idUser, this.accountService.getToken()).subscribe(_res => {

      this.isLoading = false;

      this.taskService.setIsReload(true);

      this.close();

    }, _err => {

      this.isLoading = false;
    })

  }

  changeStatus() {
    this.active = !this.active;

    this.newTaskForm.patchValue({active: this.active});
  }

}
