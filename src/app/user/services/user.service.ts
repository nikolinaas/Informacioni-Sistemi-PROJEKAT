import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  private adminURL = 'http://localhost:8080/Server/api/admin';
  private educatorsURL = 'http://localhost:8080/Server/api/educators';

  constructor(private http:HttpClient) {

   }


  getAdminData(id: number) {
    return this.http.get(`${this.adminURL}/${id}`, {observe: 'response'});
  }

  getEducatorData(id: number) {
    return this.http.get(`${this.educatorsURL}/${id}`, {observe: 'response'});
}

  updateAdminCredentials(data:any, id:number){
    return this.http.put(`${this.adminURL}/${id}/${'credentials'}`, data, {observe: 'response'});

  }

  updateEducatorCredentials(data:any, id:number){
    return this.http.put(`${this.educatorsURL}/${id}/${'credentials'}`, data, {observe: 'response'});

  }


}
