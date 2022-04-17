import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import ptLocale from '@fullcalendar/core/locales/pt';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-my-entries',
  templateUrl: './my-entries.component.html',
  styleUrls: ['./my-entries.component.scss']
})
export class MyEntriesComponent implements OnInit {

  calendarPlugins=[dayGridPlugin]

  calendarOptions: CalendarOptions = {
    locale: ptLocale,
    initialView: 'dayGridMonth',
    weekends: false, // initial value
    events: [
      { title: 'event 1', date: '2019-04-01' },
      { title: 'event 2', date: '2019-04-02' }
    ]
  };

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr)
  }

  close(){

    this.dialog.closeAll();

  }

}
