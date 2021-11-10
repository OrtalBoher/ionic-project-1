import { Component, OnInit } from '@angular/core';
import { Root, Main, Weather, Wind } from '../interfaces/forecast.interface';
import { ForecastService } from '../services/forecast.service';
import { Geolocation } from '@capacitor/geolocation';
import { GlobalService } from '../services/global.service';
import { Router } from '@angular/router';
import { AlertController,ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  root: Root;
  temp: Main;
  weatherDesc: Weather;
  wind: Wind;
  lat: number;
  lon: number;

  constructor(private global: GlobalService,
    public weather: ForecastService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    ) {}
  ngOnInit(): void {

  }

  printLocationWeatherReport = async () => {
    const coordinates = await Geolocation.getCurrentPosition();

    console.log('Current position tab1:', coordinates);
    this.lat = coordinates.coords.latitude;
    this.lon = coordinates.coords.longitude;
    this.weather.getForecast(this.lat, this.lon).subscribe((resp: Root) => {
      this.root = resp;
      this.temp = resp.main;
      this.weatherDesc = resp.weather[0];
      this.wind = resp.wind;
      console.log(this.root);
      this.presentToastWithOptions();

    });
  };

async presentToastWithOptions() {
  const toast = await this.toastController.create({
    header: 'Verify',
    message: 'Verify with a sky picture?',
    position: 'bottom',
    buttons: [
      {
        side: 'start',
        icon: 'Cancel',
        text: 'Cancel',
        handler: () => {
          console.log('Cancel');
        }
      }, {
        text: 'Take a pic',
        role: 'cancel',
        handler: () => {
          console.log('Confirm Okay');
          this.router.navigate(['tabs/tab2']);
        }
      }
    ]
  });
  await toast.present();

  const { role } = await toast.onDidDismiss();
  console.log('onDidDismiss resolved with role', role);
}

        }


