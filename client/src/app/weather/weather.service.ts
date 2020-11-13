import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RestService } from '../services/rest/rest.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weatherData = new BehaviorSubject<any>({});
  constructor(
    private restService: RestService,
  ) { }

  getData(city = 'Pune') {
    const path = 'weather'
    this.restService.get(path, { city }).subscribe(data => {
      this.weatherData.next(data);
    })
  }
}
