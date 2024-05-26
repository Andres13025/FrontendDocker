import { Component, OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

interface WeatherData {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  displayedColumns: string[] = ['date', 'temperatureC', 'temperatureF', 'summary'];
  dataSource: WeatherData[] = [];

  constructor(private http: HttpClient){
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.http.get<WeatherData[]>('https://localhost:7068/WeatherForecast')
    .pipe(
      catchError(error => {
        console.error('Error al obtener los datos del clima:', error);
        return throwError(error); // Propaga el error
      })
    )
    .subscribe(
      data => {
        this.dataSource = data;
      }
    );
  }
}
