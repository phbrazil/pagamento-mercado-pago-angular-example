import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import ptLocale from '@fullcalendar/core/locales/pt';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import moment from 'moment';
import { TimeTask } from 'src/app/_models/time-task';
import { TimeService } from 'src/app/_services/time.service';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-my-time',
  templateUrl: './my-time.component.html',
  styleUrls: ['./my-time.component.scss']
})
export class MyTimeComponent implements OnInit {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  @ViewChild("changeViewElement") changeViewElement: ElementRef;

  calendarPlugins = [dayGridPlugin];

  isWeekend: boolean = false;

  currentMonth: string;

  tasks: TimeTask[] = [];

  isLoading: boolean = false;

  events: any = [];

  user: User;

  isCheckedInitialView: boolean = false;


  //'dayGridWeek'

  calendarOptions: CalendarOptions = {
    locale: ptLocale,
    initialView: this.parameters.initialView,
    dateClick: this.handleDateClick.bind(this), // bind is important!
    weekends: this.isWeekend, // initial value
    events: this.events,
    eventColor: '#357a38',
    customButtons: {
      next: {
        text: "Próximo",
        click: this.nextMonth.bind(this),
      },
      prev: {
        text: "Anterior",
        click: this.prevMonth.bind(this),
      },

      today: {
        text: "Hoje",
        click: this.today.bind(this),
      }
    },
  } as CalendarOptions;

  constructor(private dialog: MatDialog, private timeService: TimeService,
    private accountService: AccountService,
    @Inject(MAT_DIALOG_DATA) public parameters: any) {

    this.parameters.initialView == 'dayGridMonth' ? this.isCheckedInitialView = false : this.isCheckedInitialView = true;

    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {

    //POPULA DATA COM MES INICIAL AO INICIAR
    var today = new Date();
    var day = '01';
    var month = today.getMonth() + 1;
    var year = today.getFullYear();

    this.currentMonth = day + '-' + month + '-' + year;


    this.loadMyTasks();

  }

  handleDateClick(arg: any) {
    console.log('date click! ' + arg.dateStr)
  }

  nextMonth(): void {

    let calendarApi = this.calendarComponent.getApi();

    calendarApi.next();

    var date = moment(calendarApi.getDate(), "DD/MM/YYYY");

    this.currentMonth = date.format("DD-MM-YYYY");

    this.loadMyTasks();

  }

  prevMonth(): void {

    let calendarApi = this.calendarComponent.getApi();

    calendarApi.prev();

    var date = moment(calendarApi.getDate(), "DD/MM/YYYY");

    this.currentMonth = date.format("DD-MM-YYYY");

    this.loadMyTasks();
  }

  today(): void {

    let calendarApi = this.calendarComponent.getApi();

    calendarApi.today();

    var date = moment(calendarApi.getDate(), "DD/MM/YYYY");

    this.currentMonth = date.format("DD-MM-YYYY");

    this.loadMyTasks();

  }

  close() {

    this.dialog.closeAll();

  }

  enableWeekend() {

    this.isWeekend = !this.isWeekend;

    this.changeCalendar(this.isWeekend, this.parameters.initialView);

  }

  loadMyTasks() {

    this.tasks = [];

    //this.isLoading = true;

    var date = moment(this.currentMonth, "DD/MM/YYYY"); // 1st argument - string, 2nd argument - format

    var toDate = new Date(date.format("YYYY/MM/DD"));

    let toDateFormatted = (toDate.getDate() + 30) + '-' + (toDate.getMonth() + 1) + '-' + toDate.getFullYear();

    this.timeService.getEntriesByDate(this.user.idUser, this.currentMonth, toDateFormatted, this.accountService.getToken()).subscribe(res => {
      this.tasks = res;
      this.isLoading = false;
      this.newEvents();
    }, _err => {
      this.isLoading = false;
    })
  }

  newEvents(){

    this.events = [];

    this.tasks.forEach(task => {

      let event = {
        title: Number(task.time.replace(':', '.')) + ' hrs ' + task.project,
        date: this.timeService.convertDDMMYYYToYYYYMMDD(task.date)
      }

      this.events.push(event);

      if (this.events.length == this.tasks.length) {

        this.calendarOptions.events = this.events;

      }
    });

  }

  changeCalendar(isWeekend: boolean, initialView: string) {

    this.calendarOptions.initialView = initialView;

    this.calendarOptions.weekends = isWeekend;

  }

  changeView(event: any) {

    if (event.target.checked) {

      this.close();

      this.dialog.open(MyTimeComponent,
        {
          data: {
            initialView: 'dayGridWeek'
          }
        });
    } else {

      this.dialog.open(MyTimeComponent,
        {
          data: {
            initialView: 'dayGridMonth'
          }
        });

    }
  }


}
