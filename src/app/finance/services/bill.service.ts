import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) {}

  private billURL = 'http://10.99.145.167:8080/Server/api/bills';

  getBills() {
    return this.http.get(`${this.billURL}`);
  }

   deleteBill(id?: string) {
    return this.http.delete(`${this.billURL}/${id}`, { observe: 'response' });
  }

   updateBill(id?: string) {
    return this.http.put(`${this.billURL}/${id}`, {
      observe: 'response',
    });
  }

  createBill(bill: any) {
    return this.http.post(`${this.billURL}`, bill, { observe: 'response' });
  }
}
