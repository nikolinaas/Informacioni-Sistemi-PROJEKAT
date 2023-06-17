import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) { }

  private groupURL = 'http://localhost:8080/Server/api/groups';

  getActivites(id:any){
    return this.http.get(
      `${this.groupURL}/${id}/activity`);
  }

  addActivity(id:any,activity:any){
return this.http.post(`${this.groupURL}/${id}/activity`, activity, {observe: 'response'});
  }
}
