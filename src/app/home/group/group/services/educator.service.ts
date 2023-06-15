import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EducatorService {

  constructor(private http: HttpClient) { }

  private groupURL = 'http://localhost:8080/Server/api/educators';

  getEducators(){
    return this.http.get(
      `${this.groupURL}`
    );
  }

}
