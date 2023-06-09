import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

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
    zoom: 12,
    center: this.initialCoordinates,
    mapTypeId: 'hybrid',
  };

  lat!: number;
  lng!: number;

  constructor(
    private dialogRef: MatDialogRef<PopupComponent>,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const city = 'London';
    const state = 'England';
    const country = 'GB';
    const limit = 10;
    const apiKey = API_KEY;

    this.makeWeatherApiCall(city, state, country, limit, apiKey);
  }

  close(): void {
    this.dialogRef.close();
  }

  makeWeatherApiCall(
    city: string,
    state: string,
    country: string,
    limit: number,
    apiKey: string
  ): void {
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=${limit}&appid=${apiKey}`;
  
    this.http.get(apiUrl).subscribe(
      (response: Object) => {
        const locations = Array.isArray(response) ? response : [response];
        locations.forEach((location: any) => {
          this.lat = location.lat;
          this.lng = location.lon;
          console.log('Latitude:', this.lat);
          console.log('Longitude:', this.lng);
        });
  
        // Update the initialCoordinates with the retrieved latitude and longitude
        this.initialCoordinates = {
          lat: this.lat,
          lng: this.lng,
        };
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  
}
