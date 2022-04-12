import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { faArrowLeft, faArrowRight, faClock } from '@fortawesome/free-solid-svg-icons';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { TimeTask } from 'src/app/_models/task';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { TimeService } from 'src/app/_services/time.service';
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

  isLoading: boolean = false;

  currentDayFormatted = moment(new Date(this.day)).format('Do MMMM YYYY');
  today = moment(new Date(this.day)).format('Do MMMM YYYY');

  constructor(private readonly dialog: MatDialog, private fb: FormBuilder, private calendar: NgbCalendar,
    private accountService: AccountService, private timeService: TimeService) {

    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {

    this.timeService.getCurrentDay().subscribe(res => {

      if (res != null) {
        this.day = res;
        this.currentDayFormatted = moment(new Date(this.day)).format('Do MMMM YYYY');
        this.today = moment(new Date(this.day)).format('Do MMMM YYYY');

      }

      this.loadTasks();

      this.checkIsToday();

    })


    this.calcTime(1.50);

  }

  newEntry() {

    this.timeService.setCurrentDay(this.day);

    this.dialog.open(NewEntryComponent,
      {
        data: {
          currentDayFormatted: this.currentDayFormatted,
          currentDay: moment(this.day).format('DD-MM-YYYY')
        }
      });
  }

  checkIsToday() {

    let today = moment(new Date()).format('Do MMMM YYYY');

    this.isToday = false;

    if (this.currentDayFormatted == today) {

      this.isToday = true;

    }

  }

  selectToday() {
    this.model = this.calendar.getToday();

    this.currentDayFormatted = moment(new Date(this.model.month + '-' + this.model.day + '-' + this.model.year)).format('Do MMMM YYYY');

    this.day = new Date(this.model.month + '-' + this.model.day + '-' + this.model.year);

    this.loadTasks();

    this.checkIsToday();

    this.close();

  }

  loadTasks() {

    this.tasks = [];

    this.isLoading = true;

    this.timeService.getEntries(this.user.idUser, moment(this.day).format('DD-MM-YYYY'), this.accountService.getToken()).subscribe(res => {

      this.tasks = res;

      this.isLoading = false;

    }, err => {

      this.isLoading = false;

    });

    /*for (var i = 1; i < 10; i++) {

      this.task = { idTask: 1, project: 'Projeto Teste ' + i, idUser: this.user.idUser, task: 'Tarefa ' + i, date: this.currentDayFormatted, time: this.calcTime(7.45) }

      this.tasks.push(this.task);
    }*/

  }

  nextDay() {

    this.day.setDate(this.day.getDate() + 1);

    this.currentDayFormatted = moment(new Date(this.day)).format('Do MMMM YYYY');

    this.loadTasks();

    this.checkIsToday();

    this.close();

  }

  previousDay() {

    this.day.setDate(this.day.getDate() - 1);

    this.currentDayFormatted = moment(new Date(this.day)).format('Do MMMM YYYY');

    this.loadTasks();

    this.checkIsToday();

    this.close();

  }

  changeDay() {


    this.currentDayFormatted = moment(new Date(this.model.month + '-' + this.model.day + '-' + this.model.year)).format('Do MMMM YYYY');

    this.day = new Date(this.model.month + '-' + this.model.day + '-' + this.model.year);

    this.loadTasks();

    this.checkIsToday();

    this.close();


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

  close() {
    this.dialog.closeAll();
  }


}
