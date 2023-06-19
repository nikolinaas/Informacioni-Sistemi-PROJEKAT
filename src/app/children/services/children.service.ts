import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChildrenService {
  constructor(private http: HttpClient) {}

  private childrenURL = 'http://10.99.145.167:8080/Server/api/children';
  private groupURL = 'http://10.99.145.167:8080/Server/api/groups/';

  private headers = new HttpHeaders().set(
    'Authorization',
    'Bearer ' + sessionStorage.getItem('auth')
  );

  getChildren() {
    return this.http.get(`${this.childrenURL}`, {
      headers: this.headers,
    });
  }

  createChild(child: any) {
    return this.http.post(`${this.childrenURL}`, child, {
      observe: 'response',
      headers: this.headers,
    });
  }

  deleteChild(id?: number) {
    return this.http.delete(`${this.childrenURL}/${id}`, {
      observe: 'response',
      headers: this.headers,
    });
  }

  getChild(id?: number) {
    return this.http.get(`${this.childrenURL}/${id}`, {
      observe: 'response',
      headers: this.headers,
    });
  }

  updateChild(child: any, id: number) {
    return this.http.put(`${this.childrenURL}/${id}`, child);
  }

  getFile(id?: number) {
    return this.http.get(`${this.childrenURL}/${id}/medicalClearance`, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  updateFile(medicalClearance: any, id?: number) {
    return this.http.put(
      `${this.childrenURL}/${id}/medicalClearance`,
      medicalClearance
    );
  }

  getGroup(id: number) {
    return this.http.get(`${this.groupURL + id}`, { observe: 'response' });
  }
}
