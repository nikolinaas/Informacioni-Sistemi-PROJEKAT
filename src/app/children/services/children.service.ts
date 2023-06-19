import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChildrenService {
  
  constructor(private http: HttpClient) { }

  private childrenURL = 'http://10.99.145.167:8080/Server/api/children';
  private groupURL = 'http://10.99.145.167:8080/Server/api/groups/';

  getChildren() {
    return this.http.get(
      `${this.childrenURL}`
    );
  }

  createChild(child: any) {
    return this.http.post(`${this.childrenURL}`, child, {observe: 'response'});
  }

  deleteChild(id?: number) {
    return this.http.delete(`${this.childrenURL}/${id}`, {observe: 'response'});
  }

  getChild(id?: number) {
    return this.http.get(`${this.childrenURL}/${id}`, {observe: 'response'});
  }

  updateChild(child: any, id: number) {
    return this.http.put(`${this.childrenURL}/${id}`, child);
  }

  getFile(id?: number) {
    return this.http.get(`${this.childrenURL}/${id}/medicalClearance`, {responseType: 'arraybuffer'});
  }

  updateFile(medicalClearance:any, id?: number){
    return this.http.put(`${this.childrenURL}/${id}/medicalClearance`, medicalClearance);
  }

  

  getGroup(id: number) {
    return this.http.get(`${this.groupURL + id}`, {observe: 'response'});
  }
}
