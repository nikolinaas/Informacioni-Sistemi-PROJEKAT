import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChildService {
  constructor(private http: HttpClient) {}

  private childrenURL = 'http://localhost:8080/Server/api/children';

  getChildren() {
    return this.http.get(`${this.childrenURL}/evidence`);
  }

  evidenceChild(id?: number, child?: any) {
    return this.http.put(`${this.childrenURL}/${id}/evidence`, JSON.stringify(child), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  getArrivalsAndDepartures(id?: number, date?: string) {
    return this.http.get(`${this.childrenURL}/${id}/evidence/${date}`);
  }
}
