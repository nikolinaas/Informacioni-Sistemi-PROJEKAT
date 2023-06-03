import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChildrenService {
  
  constructor(private http: HttpClient) { }

  private childrenURL = 'http://localhost:8080/Server/api/children';

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
    return this.http.get(`${this.childrenURL}/${id}/medicalClearance`);
  }
}
