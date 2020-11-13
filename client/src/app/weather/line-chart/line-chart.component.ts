import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { WeatherService } from '../weather.service';
import { Label, Color } from 'ng2-charts';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  weatherData = [];
  parametersToShow = [{
    key: 'temp',
    name: 'Temperature (in °C)',
    converter: (value) => value - 273.15
  },
  {
    key: 'humidity',
    name: 'Humidity (in %)',
  }]
  selectedParameter = this.parametersToShow[0];
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'red',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  weatherDataByDay = [];
  selectedWeatherData: any;
  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.weatherService.weatherData.subscribe(
      ({ list }) => {
        this.initLineChartData(list);
      }
    )
  }

  initLineChartData(list) {
    if (!list) {
      return;
    }
    this.weatherData = list;
    this.lineChartLabels = [];
    this.initWeatherDataGroupByDay()
    this.initLineChart(this.weatherDataByDay[1]);
  }

  initLineChart(weatherData: any = this.selectedWeatherData) {
    this.lineChartData = [{ data: [], label: this.selectedParameter.name }];
    const key = this.selectedParameter.key;
    const converter = this.selectedParameter.converter;
    this.lineChartLabels = [];
    weatherData.list.forEach((data) => {
      const convertValue = converter ? converter(data.main[key]) : data.main[key]
      this.lineChartLabels.push(data.dt_txt);
      this.lineChartData[0].data.push(convertValue);
    })
  }

  initWeatherDataGroupByDay() {
    let currentDate = new Date(this.weatherData[0].dt_txt);
    let currentWeatherList = [];
    this.weatherData.forEach((weather) => {
      const weatherDate = new Date(weather.dt_txt);
      if (weatherDate.getDay() === currentDate.getDay()) {
        currentWeatherList.push(weather);
      } else {
        this.weatherDataByDay.push({ date: currentDate, list: currentWeatherList })
        currentWeatherList = [weather];
        currentDate = weatherDate;
      }
    })
    this.weatherDataByDay.push({ date: currentDate, list: currentWeatherList })
    this.selectedWeatherData = this.weatherDataByDay[0];
  }
}

