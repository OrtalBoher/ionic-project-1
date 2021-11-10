import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Geolocation } from '@capacitor/geolocation';
import { Root } from '../interfaces/forecast.interface';


@Injectable({
  providedIn: 'root',
})
export class ForecastService {
 apiKey = '4ade45c35662aa65a615cdddee5a6125';

  constructor(
    private httpClient: HttpClient,
  ) {}

  // async getLocation(){
  // return await this.geolocation.getCurrentPosition();
  // console.log('Current position:', coordinates);
  // }
  // async getLocation() {
  //   return await this.geolocation.getCurrentPosition(lat: number, lon: number);
  //   console.log('Current position:', coordinates);
  // }

 getForecast(lat: number, lon: number): Observable<Root> {
    return this.httpClient.get<Root>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&&cnt=10&appid=${this.apiKey}`
    );
  }
 }
// 31.9595819
// 34.8847515
// https://api.openweathermap.org/data/2.5/weather?lat=31.9595819&lon=34.8847515&&cnt=10&appid=4ade45c35662aa65a615cdddee5a6125
