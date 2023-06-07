import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

 
  constructor(private http: HttpClient) {}

  private groupURL = 'http://localhost:8080/Server/api/groups/';

  getGroup(id:number) {
    return this.http.get(
      `${this.groupURL+id}`
    );
  }

  editGroup(group:any, id:any){
    console.log(id);
    return this.http.put(`${this.groupURL+id}`,group);
  }
  
}
