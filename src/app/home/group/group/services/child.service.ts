import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChildService {
  constructor(private http: HttpClient) {}

  private groupURL = 'http://localhost:8080/Server/api/children';

  private headers = new HttpHeaders().set(
    'Authorization',
    'Bearer ' + sessionStorage.getItem('auth')
  );

  getChildren() {
    return this.http.get(`${this.groupURL}`, { headers: this.headers });
  }
}
