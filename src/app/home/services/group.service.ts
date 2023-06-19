import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private http: HttpClient) {}

  private groupURL = 'http://10.99.145.167:8080/Server/api/groups';

  private headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('auth'));

  getGroups() {
    return this.http.get(`${this.groupURL}`, { headers: this.headers });
  }

  createGroup(group: any) {
    return this.http.post(`${this.groupURL}`, group, { observe: 'response', headers: this.headers });
  }

  deleteGroup(id?: number) {
    return this.http.delete(`${this.groupURL}/${id}`, { observe: 'response', headers: this.headers });
  }
}
