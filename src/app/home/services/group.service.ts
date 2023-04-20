import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  getGroups() {
    return this.http.get(
      `http://localhost:8080/Server/api/groups`
    );
  }

  createGroup(groupName: string) {
    return this.http.post(`http://localhost:8080/Server/api/groups/${groupName}`, null, {observe: 'response'});
  }

  deleteGroup(id?: number) {
    return this.http.put(`http://localhost:8080/Server/api/groups/${id}/delete`, {observe: 'response'});
  }
}
