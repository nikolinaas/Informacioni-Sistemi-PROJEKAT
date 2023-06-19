import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class EducatorService {
  constructor(private http: HttpClient) {}

  private groupURL = 'http://10.99.145.167:8080/Server/api/educators';

  private headers = new HttpHeaders().set(
    'Authorization',
    'Bearer ' + sessionStorage.getItem('auth')
  );

  getEducators() {
    return this.http.get(`${this.groupURL}`, { headers: this.headers });
  }
}
