import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: WeatherComponent,
    children: [
      {
        path: 'table',
      },
      {
        path: 'line-chart',
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
    WeatherComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class WeatherModule { }
