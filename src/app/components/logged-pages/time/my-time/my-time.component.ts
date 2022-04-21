import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, CalendarApi, FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import ptLocale from '@fullcalendar/core/locales/pt';
import { MatDialog } from '@angular/material/dialog';
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

  calendarPlugins = [dayGridPlugin];

  isWeekend: boolean = true;

  currentMonth: string;

  tasks: TimeTask[] = [];

  isLoading: boolean = false;

  user: User;

  calendarOptions: CalendarOptions = {
    locale: ptLocale,
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    weekends: this.isWeekend, // initial value
    events: [
      { title: '3 hrs', date: '2022-04-05' },
      { title: '7 hrs', date: '2022-04-07' }
    ],
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
  };

  constructor(private dialog: MatDialog, private timeService: TimeService, private accountService: AccountService) {

    this.accountService.user.subscribe(x => this.user = x);

   }

  ngOnInit() {

  }

  handleDateClick(arg: any) {
    console.log('date click! ' + arg.dateStr)
  }

  nextMonth(): void {

    let calendarApi = this.calendarComponent.getApi();

    calendarApi.next();

    var date = moment(calendarApi.getDate(), "DD/MM/YYYY");

    this.currentMonth = date.format("DD-MM-YYYY");

    this.loadTasks();

  }

  prevMonth(): void {

    let calendarApi = this.calendarComponent.getApi();

    calendarApi.prev();

    var date = moment(calendarApi.getDate(), "DD/MM/YYYY");

    this.currentMonth = date.format("DD-MM-YYYY");

    this.loadTasks();

  }

  today(): void {

    let calendarApi = this.calendarComponent.getApi();

    calendarApi.today();

    var date = moment(calendarApi.getDate(), "DD/MM/YYYY");

    this.currentMonth = date.format("DD-MM-YYYY");

    this.loadTasks();

  }

  close() {

    console.log('cliquei')

    this.dialog.closeAll();

  }

  enableWeekend() {
    this.isWeekend = !this.isWeekend;

    this.calendarOptions = {
      locale: ptLocale,
      initialView: 'dayGridMonth',
      dateClick: this.handleDateClick.bind(this), // bind is important!
      weekends: this.isWeekend, // initial value
      events: [
        { title: '3 hrs', date: '2022-04-05' },
        { title: '7 hrs', date: '2022-04-07' }
      ]
    } as CalendarOptions;
  }

  loadTasks(){

    this.tasks = [];

    this.isLoading = true;

    var date = moment(this.currentMonth, "DD/MM/YYYY"); // 1st argument - string, 2nd argument - format

    var toDate = new Date(date.format("YYYY/MM/DD"));

    let toDateFormatted = (toDate.getDate()+30)+'-'+(toDate.getMonth()+1)+'-'+toDate.getFullYear();

    this.timeService.getEntriesByDate(this.user.idUser, this.currentMonth, toDateFormatted , this.accountService.getToken()).subscribe(res =>{
      this.tasks = res;
      this.isLoading = false;
      this.reloadCalendar();
    }, _err=>{
      this.isLoading = false;
    })
  }

  reloadCalendar() {

    this.tasks.forEach(task => {

      console.log(task)

    });
  }
}
