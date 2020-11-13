import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather.component';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
const routes: Routes = [
  {
    path: '',
    component: WeatherComponent,
    children: [
      {
        path: 'table',
        component: TableComponent
      },
      {
        path: 'line-chart',
        component: LineChartComponent
      },
      {
        path: '**',
        redirectTo: 'table'
      },
    ]
  }
]

@NgModule({
  declarations: [
    WeatherComponent,
    TableComponent,
    LineChartComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ChartsModule
  ]
})
export class WeatherModule { }
