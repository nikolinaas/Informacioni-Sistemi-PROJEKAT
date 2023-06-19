import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KindergartenService {

  constructor(private http: HttpClient) { }

  private kindergartenUrl = 'http://10.99.145.167:8080/Server/api/kindergarten';

  getInfo() {
    return this.http.get(
      `${this.kindergartenUrl}`
    );
  }

  updateData(kindergarten: any) {
    return this.http.put(`${this.kindergartenUrl}`, kindergarten);
  }
}
