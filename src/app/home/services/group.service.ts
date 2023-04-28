import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  private groupURL = 'http://localhost:8080/Server/api/groups';

  getGroups() {
    return this.http.get(
      `${this.groupURL}`
    );
  }

  createGroup(group: any) {
    return this.http.post(`${this.groupURL}`, group, {observe: 'response'});
  }

  deleteGroup(id?: number) {
    return this.http.delete(`${this.groupURL}/${id}`, {observe: 'response'});
  }
}
