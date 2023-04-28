import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kindergarten } from 'src/app/model/kindergarten.model';

@Injectable({
  providedIn: 'root'
})
export class KindergartenService {

  private _kindergarten?: Kindergarten;

  constructor(private http: HttpClient) { }

  private kindergartenUrl = 'http://localhost:8080/Server/api/kindergarten';

  getInfo() {
    return this.http.get(`${this.kindergartenUrl}`).subscribe((kindergarten: any) => {
      this._kindergarten = kindergarten;
    });
  }

  updateData(kindergarten: any) {
    return this.http.put(`${this.kindergartenUrl}`, kindergarten);
  }

  get kindergarten() {
    return this._kindergarten;
  }

  set kindergarten(kindergarten: Kindergarten | undefined) {
    this._kindergarten = kindergarten;
  }
}
