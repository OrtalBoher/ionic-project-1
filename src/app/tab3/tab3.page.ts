import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {


constructor() {}
printCurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();

  console.log('Current position:', coordinates);
};


}


