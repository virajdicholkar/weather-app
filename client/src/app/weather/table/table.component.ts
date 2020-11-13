import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  weatherData = []
  selectedWeather = {};
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
    if (!weatherData) {
      return;
    }
    this.weatherData = [];
    let currentDate = new Date(weatherData[0].dt_txt);
    let currentCount = 0;
    let currentTempTotal = 0;
    let currentPressureTotal = 0;
    let currentHumidityTotal = 0;
    let currentWeatherList = [];
    weatherData.forEach((weather) => {
      const weatherDate = new Date(weather.dt_txt);
      if (weatherDate.getDay() === currentDate.getDay()) {
        currentCount++;
        currentTempTotal += weather.main.temp;
        currentHumidityTotal += weather.main.humidity;
        currentPressureTotal += weather.main.pressure;
        currentWeatherList.push(weather);
      } else {
        console.log('currentTempTotal', currentTempTotal)
        console.log('currentPressureTotal', currentPressureTotal)
        const newAvgWeather = {
          date: currentDate,
          temp: currentTempTotal / currentCount,
          pressure: currentPressureTotal / currentCount,
          humidity: currentHumidityTotal / currentCount,
          weatherList: currentWeatherList
        }
        this.weatherData.push(newAvgWeather);
        currentCount = 1;
        currentTempTotal = weather.main.temp;
        currentHumidityTotal = weather.main.humidity;
        currentPressureTotal = weather.main.pressure;
        currentWeatherList = [weather];
        currentDate = weatherDate;
        
      }
      console.log('this.weatherData', this.weatherData)
    })
  }

  convertKelvinToDegree(tempInKelvin) {
    return tempInKelvin - 273.15;
  }

}
