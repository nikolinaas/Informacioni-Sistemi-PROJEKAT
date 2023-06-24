import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KindergartenService {

  constructor(private http: HttpClient) { }
  private headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('auth'));

  private kindergartenUrl = 'http://localhost:8080/Server/api/kindergarten';

  getInfo() {
    return this.http.get(
      `${this.kindergartenUrl}`,{ headers: this.headers}
    );
  }

  updateData(kindergarten: any) {
    return this.http.put(`${this.kindergartenUrl}`, kindergarten, {observe: 'response', headers: this.headers});
  }
}
