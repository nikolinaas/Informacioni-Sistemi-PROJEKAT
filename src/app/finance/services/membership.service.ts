import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  constructor(private http: HttpClient) {}

  private membershipURL = 'http://localhost:8080/Server/api/memberships';

  getMemberships() {
    return this.http.get(`${this.membershipURL}`);
  }

  createMembership(membership: any) {
    return this.http.post(`${this.membershipURL}/${membership.child.id}`, membership, {
      observe: 'response',
    });
  }

  updateMembersip(id: number) {
    return this.http.put(`${this.membershipURL}/${id}`, null);
  }
}
