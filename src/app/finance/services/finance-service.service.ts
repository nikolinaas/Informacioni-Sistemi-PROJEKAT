import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FinanceServiceService {

  constructor(private http : HttpClient) { 

  }

  private billURL = 'http://localhost:8080/Server/api/bill';
  private memberShipURL='http://localhost:8080/Server/api/membership'
  private childrenURL = 'http://localhost:8080/Server/api/children';

  getChildren() {
    return this.http.get(
      `${this.childrenURL}`
    );
  }

  getBill() {
    return this.http.get(
      `${this.billURL}`
    );
  }
  createBill(bill: any)
  {
      return this.http.post(`${this.billURL}`, bill, {observe: 'response'});
  }
  deleteBill(id?: number) {
    return this.http.delete(`${this.billURL}/${id}`, {observe: 'response'});
  }
  getMembership()
  {
    return this.http.get(
      `${this.memberShipURL}`
    );
  }
  createMembership(membership: any,id:number)
  {
    return this.http.post(`${this.memberShipURL}/${id}`, membership, {observe: 'response'});
  }
}
