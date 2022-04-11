import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { faArrowLeft, faArrowRight, faClock } from '@fortawesome/free-solid-svg-icons';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { TimeTask } from 'src/app/_models/task';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { NewEntryComponent } from './new-entry/new-entry.component';
@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit {


  entryForm = new FormGroup({
    date: new FormControl(''),
  });

  model: NgbDateStruct;
  date: { year: number, month: number };

  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faClock = faClock;

  tasks: TimeTask[] = [];

  user: User;
  task: TimeTask;

  day = new Date();

  total: number = 8.45;

  isToday: boolean = true;

  currentDay = moment(new Date(this.day)).format('Do MMMM YYYY');
  today = moment(new Date(this.day)).format('Do MMMM YYYY');

  constructor(private readonly dialog: MatDialog, private fb: FormBuilder, private calendar: NgbCalendar,
    private accountService: AccountService) {

    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {

    this.loadTasks();

    this.calcTime(1.50);

  }

  newEntry() {

    this.dialog.open(NewEntryComponent,
      {
        data: {
          currentDay: this.currentDay
        }
      });
  }

  checkIsToday() {

    if (this.currentDay == this.today) {

      this.isToday = true;

    } else {

      this.isToday = false;

    }


  }

  selectToday() {
    this.model = this.calendar.getToday();

    this.currentDay = moment(new Date(this.model.month + '-' + this.model.day + '-' + this.model.year)).format('Do MMMM YYYY');


    this.loadTasks();

    this.checkIsToday();
  }

  loadTasks() {

    this.tasks = [];

    for (var i = 1; i < 10; i++) {

      this.task = { idTask: 1, project: 'Projeto Teste ' + i, user: this.user, task: 'Tarefa ' + i, date: this.currentDay, time: this.calcTime(7.45) }

      this.tasks.push(this.task);
    }

  }

  nextDay() {

    this.day.setDate(this.day.getDate() + 1);

    this.currentDay = moment(new Date(this.day)).format('Do MMMM YYYY');

    this.loadTasks();

    this.checkIsToday();

  }

  previousDay() {

    this.day.setDate(this.day.getDate() - 1);

    this.currentDay = moment(new Date(this.day)).format('Do MMMM YYYY');

    this.loadTasks();

    this.checkIsToday();

  }

  changeDay() {


    this.currentDay = moment(new Date(this.model.month + '-' + this.model.day + '-' + this.model.year)).format('Do MMMM YYYY');

    this.loadTasks();

    this.checkIsToday();


  }

  calcTime(time: number) {

    var hour = Number(String(time).split(".")[0]);
    var minute = Number(String(time).split(".")[1]);

    do {

      if (minute >= 60) {
        hour = hour + 1;
        minute = minute - 60;
      }

    } while (minute >= 60);

    return hour + ':' + minute;

  }


}
