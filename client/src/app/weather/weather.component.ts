import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest/rest.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  constructor(
    private restService: RestService,
  ) { }

  ngOnInit(): void {
    this.getWeatherData();
  }

  getWeatherData(city = 'Pune') {
    const path = 'weather'
    this.restService.get(path, { city }).subscribe(data=>{
      console.log('data', data)
    })
  }
}
