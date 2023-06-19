import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private http: HttpClient) {}

  private groupURL = 'http://10.99.145.167:8080/Server/api/groups/';

  private headers = new HttpHeaders().set(
    'Authorization',
    'Bearer ' + sessionStorage.getItem('auth')
  );

  getGroup(id: number) {
    return this.http.get(`${this.groupURL + id}`, { headers: this.headers });
  }

  editGroup(group: any, id: any) {
    return this.http.put(`${this.groupURL + id}`, group, {
      observe: 'response',
      headers: this.headers,
    });
  }

  deleteChildFromGroup(groupId: any, childId: any) {
    return this.http.delete(
      `${this.groupURL + groupId + '/children/' + childId}`,
      { observe: 'response', headers: this.headers }
    );
  }

  deleteEducatorFromGroup(groupId: any, educatorId: any) {
    return this.http.delete(
      `${this.groupURL + groupId + '/educators/' + educatorId}`,
      { observe: 'response', headers: this.headers }
    );
  }

  addChildInGroup(groupId: any, child: any) {
    return this.http.post(
      `${this.groupURL + groupId + '/children/' + child.id}`,
      child,
      { observe: 'response', headers: this.headers }
    );
  }

  addEducatorInGroup(groupId: any, educator: any) {
    return this.http.post(
      `${this.groupURL + groupId + '/educators/' + educator.id}`,
      educator,
      { observe: 'response', headers: this.headers }
    );
  }
}
