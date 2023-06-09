import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { API_KEY } from './../api-keys';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  initialCoordinates = {
    lat: 45.5019,
    lng: 73.5674,
  };
  mapConfigurations = {
    zoom: 15,
    center: this.initialCoordinates,
    mapTypeId: 'hybrid',
  };

  responseFromWeatherAPI: any;

  constructor(
    private dialogRef: MatDialogRef<PopupComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: { addresses: string[] }
  ) {}

  ngOnInit(): void {
    const addressParts = this.extractAddressParts();

    if (addressParts) {
      const { city, state, country } = addressParts;
      const limit = 10;
      const apiKey = API_KEY;

      this.makeWeatherAndMapsApiCalls(city, state, country, limit, apiKey);
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  extractAddressParts(): { city: string; state: string; country: string } | null {
    const addressParts = this.data.addresses[0].split(',').map((part) => part.trim());

    if (addressParts.length >= 3) {
      const city = addressParts[1];
      const state = addressParts[2];
      const country = addressParts[3];

      return { city, state, country };
    }

    return null;
  }

  makeWeatherAndMapsApiCalls(
    city: string,
    state: string,
    country: string,
    limit: number,
    apiKey: string

    
  ): void {
    // Weather API call
    const weatherApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
      city
    )},${encodeURIComponent(state)},${encodeURIComponent(country)}&limit=${limit}&appid=${apiKey}`;

    console.log('Weather API Request:', weatherApiUrl);
    console.log('City:', city);
    console.log('State:', state);
    console.log('Country:', country);
    console.log('Limit:', limit);
    this.http.get(weatherApiUrl).subscribe(
      (response: any) => {
        if (response && response.length > 0) {
          const location = response[0];
          const lat = location.lat;
          const lon = location.lon;
          console.log('City:', location.name);
          console.log('Latitude:', lat);
          console.log('Longitude:', lon);

          // Update the initialCoordinates with the retrieved latitude and longitude
          this.initialCoordinates = {
            lat: lat,
            lng: lon,
          };

          console.log(lat, lon);

          // Update the center of the mapConfigurations
          this.mapConfigurations.center = this.initialCoordinates;

          // Store the response from the weather API
          this.responseFromWeatherAPI = response;
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
