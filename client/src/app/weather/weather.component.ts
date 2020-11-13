import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  city = 'Mumbai'
  cityToLoad = 'Mumbai'
  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.getWeatherData();
    this.weatherService.weatherData.subscribe(({ city }) => {
      this.city = city ? city.name : this.city;
    })
  }

  getWeatherData() {
    this.weatherService.getData(this.cityToLoad);
  }
}
