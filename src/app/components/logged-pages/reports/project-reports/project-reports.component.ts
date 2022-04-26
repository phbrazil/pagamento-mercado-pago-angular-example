import { Component, OnInit } from '@angular/core';
import { ChartType, LegendItem } from '../../lbd/lbd-chart/lbd-chart.component';

@Component({
  selector: 'app-project-reports',
  templateUrl: './project-reports.component.html',
  styleUrls: ['./project-reports.component.scss']
})
export class ProjectReportsComponent implements OnInit {

  public emailChartType: ChartType;
  public emailChartData: any;
  public emailChartLegendItems: LegendItem[];

  public tasksChartType: ChartType;
  public tasksChartData: any;
  public tasksChartLegendItems: LegendItem[];


  public activityChartType: ChartType;
  public activityChartData: any;
  public activityChartOptions: any;
  public activityChartResponsive: any[];
  public activityChartLegendItems: LegendItem[];

  constructor() { }

  ngOnInit(): void {

    this.emailChartType = ChartType.Pie;
    this.emailChartData = {
      labels: ['62%', '32%', '6%'],
      series: [62, 32, 6]
    };
    this.emailChartLegendItems = [
      { title: 'Open', imageClass: 'fa fa-circle text-info' },
      { title: 'Bounce', imageClass: 'fa fa-circle text-danger' },
      { title: 'Unsubscribe', imageClass: 'fa fa-circle text-warning' }
    ];



    this.tasksChartType = ChartType.Pie;
    this.tasksChartData = {
      labels: ['62%', '32%', '6%'],
      series: [62, 32, 6]
    };
    this.tasksChartLegendItems = [
      { title: 'Bug', imageClass: 'fa fa-circle text-info' },
      { title: 'Melhoria', imageClass: 'fa fa-circle text-danger' },
      { title: 'Suporte', imageClass: 'fa fa-circle text-warning' }
    ];


    this.activityChartType = ChartType.Bar;
    this.activityChartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
        [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
      ]
    };
    this.activityChartOptions = {
      seriesBarDistance: 10,
      axisX: {
        showGrid: false
      },
      height: '245px'
    };
    this.activityChartResponsive = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value: any) {
            return value[0];
          }
        }
      }]
    ];
    this.activityChartLegendItems = [
      { title: 'Tesla Model S', imageClass: 'fa fa-circle text-info' },
      { title: 'BMW 5 Series', imageClass: 'fa fa-circle text-danger' }
    ];

  }

}
