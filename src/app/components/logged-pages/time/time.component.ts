import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { faArrowLeft, faArrowRight, faClock, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { TimeTask } from 'src/app/_models/time-task';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { TimeService } from 'src/app/_services/time.service';
import { MyTimeComponent } from './my-time/my-time.component';
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
  faCoffee = faCoffee;

  tasks: TimeTask[] = [];

  user: User;
  task: TimeTask;

  day = new Date();

  total: number = 0;
  totalFormatted: string;

  isToday: boolean = true;

  isLoading: boolean = false;

  isModalCalendar: boolean = false;

  currentDayFormatted = moment(new Date(this.day)).format('Do MMMM YYYY');
  today = moment(new Date(this.day)).format('Do MMMM YYYY');

  constructor(private readonly dialog: MatDialog, private calendar: NgbCalendar,
    private accountService: AccountService, private timeService: TimeService) {

    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {


    //recarrega sempre q a data muda
    this.timeService.getCurrentDay().subscribe(res => {

      if (res != null) {
        this.day = res;
        this.currentDayFormatted = moment(new Date(this.day)).format('Do MMMM YYYY');
        this.today = moment(new Date(this.day)).format('Do MMMM YYYY');

      }

      this.loadTasks();

      this.checkIsToday();

    })

    //recarrega sempre que a service mandar
    this.timeService.getIsReload().subscribe(status => {
      if (status != null && status) {
        this.loadTasks();
      }
    })

  }

  newEntry() {

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

    //FIXING DATE ON SAFARI
    this.currentDayFormatted = moment(new Date(this.model.year + '/' + this.model.month + '/' + this.model.day)).format('Do MMMM YYYY');

    this.day = new Date(this.model.year + '/' + this.model.month + '/' + this.model.day);

    this.loadTasks();

    this.checkIsToday();

    this.close();

  }

  loadTasks() {

    console.log('to aqui')

    this.timeService.setIsReload(false);

    this.tasks = [];

    this.total = 0;
    this.totalFormatted = '';

    this.isLoading = true;

    this.timeService.getEntries(this.user.idUser, moment(this.day).format('DD-MM-YYYY'), this.accountService.getToken()).subscribe(res => {

      this.tasks = res;

      this.isLoading = false;

      res.forEach(element => {

        this.total = this.total + this.timeService.calcTime(Number(element.time.replace(':', '.')));


      });

      //aqui ta dando bug modal new entry
      this.totalFormatted = this.timeService.finishCalcTime(this.total);

    }, _err => {

      this.isLoading = false;

    });

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

    //FIXING DATE ON SAFARI
    this.currentDayFormatted = moment(new Date(this.model.year + '/' + this.model.month + '/' + this.model.day)).format('Do MMMM YYYY');

    this.day = new Date(this.model.year + '/' + this.model.month + '/' + this.model.day);

    this.loadTasks();

    this.checkIsToday();

    this.close();


  }

  openCalendar() {

    this.isModalCalendar = true;
  }

  close() {

    //REMOVE FADE BUGADO QUE CONTINUAVA AO LOGAR
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();

    this.isModalCalendar = false

    this.total = 0;

    this.dialog.closeAll();
  }

  myTasks() {

    this.dialog.open(MyTimeComponent,
      {
        data: {
          currentDayFormatted: this.currentDayFormatted,
          currentDay: moment(this.day).format('DD-MM-YYYY')
        }
      });

  }
}
