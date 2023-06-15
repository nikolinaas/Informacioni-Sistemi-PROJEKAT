import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private frontendURL: string = 'http://localhost:8080/Server/api';

  constructor(private router: Router, private http: HttpClient) {}
  
  public login(credentials: any) {
    return this.http.post(`${this.frontendURL}/authentication`, credentials, {observe: 'response'});
  }
}
