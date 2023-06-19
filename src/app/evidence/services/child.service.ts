import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChildService {
  constructor(private http: HttpClient) {}

  private childrenURL = 'http://localhost:8080/Server/api/children';

  private headers = new HttpHeaders().set(
    'Authorization',
    'Bearer ' + sessionStorage.getItem('auth')
  );

  private headersEvidence = new HttpHeaders()
    .set('Authorization', 'Bearer ' + sessionStorage.getItem('auth'))
    .set('Content-Type', 'application/json');

  getChildren() {
    return this.http.get(`${this.childrenURL}/evidences`, {
      headers: this.headers,
    });
  }

  getArrivalsAndDepartures(id?: number) {
    return this.http.get(`${this.childrenURL}/${id}/evidence`);
  }
}
