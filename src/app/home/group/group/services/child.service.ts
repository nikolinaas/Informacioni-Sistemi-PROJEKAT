import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChildService {

  constructor(private http: HttpClient) { }

  private groupURL = 'http://localhost:8080/Server/api/children';


  getChildren(){
    return this.http.get(
      `${this.groupURL}`
    );
  }
}
