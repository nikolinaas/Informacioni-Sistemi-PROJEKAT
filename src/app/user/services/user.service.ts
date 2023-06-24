import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private adminURL = 'http://localhost:8080/Server/api/admin';
  private educatorsURL = 'http://localhost:8080/Server/api/educators';

  private headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('auth'));

  constructor(private http: HttpClient) {

  }


  getAdminData(id: number) {
    return this.http.get(`${this.adminURL}/${id}`, { observe: 'response', headers: this.headers });
  }

  getEducatorData(id: number) {
    return this.http.get(`${this.educatorsURL}/${id}`, { observe: 'response', headers: this.headers });
  }

  updateAdminCredentials(data: any, id: number) {
    return this.http.put(`${this.adminURL}/${id}/${'credentials'}`, data, { observe: 'response', headers: this.headers });

  }

  updateEducatorCredentials(data: any, id: number) {
    return this.http.put(`${this.educatorsURL}/${id}/${'credentials'}`, data, { observe: 'response', headers: this.headers });

  }

  updateAdminData(data: any, id: number) {
    return this.http.put(`${this.adminURL}/${id}/${'data'}`, data, { observe: 'response', headers: this.headers });
  }


}
