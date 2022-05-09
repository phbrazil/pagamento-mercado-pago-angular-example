import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import moment from 'moment';
import { TimeService } from 'src/app/_services/time.service';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user';
import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/_services/project.service';
import { Task } from 'src/app/_models/task';
import { TaskService } from 'src/app/_services/task.service';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
moment().format('LL');
moment.locale('pt')


@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.scss']
})
export class NewEntryComponent implements OnInit {

  faPencil = faPencil;

  timeModel: string = '';

  newEntryForm: FormGroup;

  isLoading: boolean = false;
  isLoadingProject: boolean = false;
  isLoadingTask: boolean = false;

  user: User;

  project: string;
  idProject: number;
  projects: Project[] = [];


  task: string;
  idTask: number;
  tasks: Task[] = [];

  notFoundProject: string = 'Nenhum projeto encontrado';
  notFoundTask: string = 'Nenhuma atividade encontrada';


  constructor(public dialog: MatDialog, private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public currentDay: any,
    private timeService: TimeService,
    private accountService: AccountService,
    private projectService: ProjectService,
    private taskService: TaskService) {

    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {

    this.newEntryForm = this.fb.group({
      project: ['', Validators.required],
      idProject: ['', Validators.required],
      time: ['', Validators.required],
      task: ['', Validators.required],
      idTask: ['', Validators.required],
      notes: [''],
      date: [this.currentDay.currentDay, Validators.required],
      idUser: [this.user.idUser, Validators.required],
    });

    this.loadProjects();
    this.loadTasks();

  }

  close() {
    this.dialog.closeAll();
  }

  onChangeProject(event: any) {

    if (event != undefined) {
      this.project = this.newEntryForm.value.project.name;
      this.idProject = this.newEntryForm.value.project.idProject;
      this.newEntryForm.patchValue({ project: this.project, idProject: this.idProject });
    }

  }

  onChangeTask(event: any) {

    if (event != undefined) {
      this.task = this.newEntryForm.value.task.name;
      this.idTask = this.newEntryForm.value.task.idTask;
      this.newEntryForm.patchValue({ idTask: this.idTask, task: this.task });
    }

  }

  checkTime(time: any) {

    this.timeModel = this.timeService.checkTime(time);

    this.newEntryForm.patchValue({
      time: this.timeModel
    })

  }

  onSubmit() {

    this.isLoading = true;

    this.timeService.newEntry(this.newEntryForm.value, this.accountService.getToken()).subscribe(_res => {

      this.timeService.setIsReload(true);

      this.isLoading = false;

      this.close();

    }, err => {

      this.isLoading = false;

    })

  }

  loadProjects() {
    this.isLoadingProject = true;

    this.projectService.getProjects(this.user.idGroup, this.accountService.getToken()).subscribe(res => {
      this.isLoadingProject = false;
      this.projects = res;


      if (this.projects.length == 0 && this.user.admin) {
        this.notFoundProject = 'Nenhum projeto encontrado, crie seus projetos no menu Projetos'
      }
    }, _err => {
      this.isLoadingProject = false;
    })

  }

  loadTasks() {
    this.isLoadingTask = true;

    this.taskService.getTasks(this.user.idGroup, this.accountService.getToken()).subscribe(res => {
      this.isLoadingTask = false;
      this.tasks = res;

      if (this.tasks.length == 0 && this.user.admin) {
        this.notFoundTask = 'Nenhuma atividade encontrada, crie suas atividades no menu Atividades'
      }
    }, _err => {
      this.isLoadingTask = false;
    })

  }

}
