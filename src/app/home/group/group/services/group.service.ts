import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private http: HttpClient) {}

  private groupURL = 'http://localhost:8080/Server/api/groups/';

  getGroup(id: number) {
    return this.http.get(`${this.groupURL + id}`);
  }

  editGroup(group: any, id: any) {
    return this.http.put(`${this.groupURL + id}`, group, {observe: 'response'});
  }

  deleteChildFromGroup(groupId: any, childId: any) {
    return this.http.delete(`${this.groupURL + groupId + '/child/' + childId}`, {observe: 'response'});
  }

  deleteEducatorFromGroup(groupId: any, educatorId: any) {
    return this.http.delete(
      `${this.groupURL + groupId + '/educator/' + educatorId}`
    );
  }

  addChildInGroup(groupId: any, child: any) {
    return this.http.post(
      `${this.groupURL + groupId + '/child/' + child.id}`,
      child, {observe: 'response'}
    );
  }

  addEducatorInGroup(groupId:any, educator:any){
    return this.http.post(
      `${this.groupURL + groupId + '/educator/' + educator.id}`,
      educator, {observe: 'response'}
    );
  }
}
