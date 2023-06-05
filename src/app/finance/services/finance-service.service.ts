import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FinanceServiceService {

  constructor(private http : HttpClient) { 

  }

  private billURL = 'http://10.1.1.195:8080/Server/api/bill';

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
}
