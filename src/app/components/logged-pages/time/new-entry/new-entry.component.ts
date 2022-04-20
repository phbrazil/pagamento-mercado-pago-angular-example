import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import moment from 'moment';
import { TimeService } from 'src/app/_services/time.service';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user';
import { Router } from '@angular/router';
import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/_services/project.service';
import { Task } from 'src/app/_models/task';
import { TaskService } from 'src/app/_services/task.service';
moment().format('LL');
moment.locale('pt')


@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.scss']
})
export class NewEntryComponent implements OnInit {

  timeModel: string;

  newEntryForm: FormGroup;

  isLoading: boolean = false;

  user: User;

  project: string;
  //projects = [{ name: 'Mustard' }, { name: 'Ketchup' }, { name: 'Relish' }, { name: 'Mustard' }, { name: 'Ketchup' }, { name: 'Relish' }, { name: 'Mustard' }, { name: 'Ketchup' }, { name: 'Relish' }];
  projects = ['MCI Brasil', 'Sparta Clã', 'Campanha de Marketing', 'Outros' ];
  //projects: Project[] = [];


  task: string;
  //tasks = [{ name: 'Relatórios' }, { name: 'Reunião Interna' }, { name: 'Reunião Externa' }, { name: 'Visita Cliente' }];
  tasks = ['Bugs', 'Melhorias', 'Manutenção', 'Suporte Email', 'Suporte Telefone', 'Visita ao cliente'];
  //tasks: Task[] = [];


  constructor(public dialog: MatDialog, private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public currentDay: any,
    private timeService: TimeService,
    private accountService: AccountService,
    private router: Router,
    private projectService: ProjectService,
    private taskService: TaskService) {

    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {

    this.newEntryForm = this.fb.group({
      project: ['', Validators.required],
      time: ['', Validators.required],
      task: ['', Validators.required],
      notes: [''],
      date: [this.currentDay.currentDay, Validators.required],
      idUser: [this.user.idUser, Validators.required],
    });

    //this.loadProjects();
    //this.loadTasks();

  }

  close() {
    this.dialog.closeAll();
  }

  onChangeProject() {

    //  this.project = this.newEntryForm.value.project.name;
    this.project = this.newEntryForm.value.project;

  }

  onChangeTask() {

    // this.task = this.newEntryForm.value.task.name;
    this.task = this.newEntryForm.value.task;

  }

  checkTime(time: any) {

    this.timeModel = this.timeService.checkTime(time);;

    this.newEntryForm.patchValue({
      time: this.timeModel
    })

  }

  onSubmit() {

    this.isLoading = true;

    this.timeService.newEntry(this.newEntryForm.value, this.accountService.getToken()).subscribe(res => {

      //this.timeService.setIsReload(true);

      this.isLoading = false;

      this.close();

    }, err => {

      this.isLoading = false;

    })

  }

  loadProjects() {
    this.isLoading = true;

    this.projectService.getProjects(this.user.idGroup, this.accountService.getToken()).subscribe(res => {
      this.isLoading = false;
      //this.projects = res;
    }, err => {
      this.isLoading = false;
    })

  }

  loadTasks() {
    this.isLoading = true;

    this.taskService.getTasks(this.user.idGroup, this.accountService.getToken()).subscribe(res => {
      this.isLoading = false;
      //this.tasks = res;
    }, err => {
      this.isLoading = false;
    })

  }


}
