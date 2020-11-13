import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  selectedWeather = {}
  weatherData = []
  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.weatherService.weatherData.subscribe(
      data => {
        this.initWeatherData(data);
      }
    )
  }

  initWeatherData(weatherData: Array<any>) {

    this.weatherData = weatherData;
    console.log('this.weatherData', this.weatherData)
  }

  convertKelvinToDegree(tempInKelvin) {
    return tempInKelvin - 273.15;
  }

}
