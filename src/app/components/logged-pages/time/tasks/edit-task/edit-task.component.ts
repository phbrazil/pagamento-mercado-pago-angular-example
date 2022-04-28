import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'src/app/_models/project';
import { TimeTask } from 'src/app/_models/time-task';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ProjectService } from 'src/app/_services/project.service';
import { TaskService } from 'src/app/_services/task.service';
import { TimeService } from 'src/app/_services/time.service';
import { Task } from 'src/app/_models/task';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  isLoading: boolean = false;

  editEntryForm: FormGroup;

  task: TimeTask

  timeModel: string;

  user: User;

  project: string;
  idProject: number;
  projects: Project[] = [];


  newTask: string;
  idTask: number;
  tasks: Task[] = [];


  constructor(public dialog: MatDialog, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public timeTask: any, private timeService: TimeService,
    private taskService: TaskService, private projectService: ProjectService, private accountService: AccountService) {

    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {

    this.task = this.timeTask.task;

    this.timeModel = this.task.time;

    this.editEntryForm = this.fb.group({
      project: [this.task.project, Validators.required],
      time: [this.task.time, Validators.required],
      task: [this.task.task, Validators.required],
      notes: [this.task.notes],
      date: [this.task.date, Validators.required],
      idUser: [this.task.idUser, Validators.required],
      idTask: [this.task.idTask, Validators.required],

    });

    this.loadProjects();
    this.loadTasks();

  }

  close() {
    this.dialog.closeAll();
  }

  checkTime(time: any) {

    this.timeModel = this.timeService.checkTime(time);

    this.editEntryForm.patchValue({
      time: this.timeModel
    })

  }

  onChangeProject() {

    this.project = this.editEntryForm.value.project.name;
    this.idProject = this.editEntryForm.value.project.idProject;
    this.editEntryForm.patchValue({ project: this.project, idProject: this.idProject });

  }

  onChangeTask() {

    this.task = this.editEntryForm.value.task.name;
    this.editEntryForm.patchValue({ task: this.task });

  }

  loadProjects() {
    this.isLoading = true;

    this.projectService.getProjects(this.user.idGroup, this.accountService.getToken()).subscribe(res => {
      this.isLoading = false;
      this.projects = res;
    }, _err => {
      this.isLoading = false;
    })

  }

  loadTasks() {
    this.isLoading = true;

    this.taskService.getTasks(this.user.idGroup, this.accountService.getToken()).subscribe(res => {
      this.isLoading = false;
      this.tasks = res;
    }, _err => {
      this.isLoading = false;
    })

  }

  editTask() {

    this.isLoading = true;

    this.timeService.editEntry(this.editEntryForm.value, this.accountService.getToken()).subscribe(res => {

      this.isLoading = false;

      this.timeService.setIsReload(true);

      this.close();

    }, _err => {

      this.isLoading = false;

    })
  }

}
