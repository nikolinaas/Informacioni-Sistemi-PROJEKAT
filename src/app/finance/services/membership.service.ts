import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  constructor(private http: HttpClient) {}

  private membershipURL = 'http://localhost:8080/Server/api/memberships';

  private headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('auth'));

  getMemberships() {
    return this.http.get(`${this.membershipURL}`, { headers: this.headers });
  }

  createMembership(membership: any) {
    return this.http.post(`${this.membershipURL}/${membership.child.id}`, membership, {
      observe: 'response', headers: this.headers
    });
  }

  updateMembersip(id: number) {
    return this.http.put(`${this.membershipURL}/${id}`, null, { headers: this.headers });
  }
}