import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  constructor(private http: HttpClient) {}

  private billURL = 'http://localhost:8080/Server/api/bills';

  private headers = new HttpHeaders().set(
    'Authorization',
    'Bearer ' + sessionStorage.getItem('auth')
  );

  getBills() {
    return this.http.get(`${this.billURL}`, { headers: this.headers });
  }

  deleteBill(id?: string) {
    return this.http.delete(`${this.billURL}/${id}`, {
      observe: 'response',
      headers: this.headers,
    });
  }

  updateBill(id?: string) {
    return this.http.put(`${this.billURL}/${id}`, null, { headers: this.headers });
  }

  createBill(bill: any) {
    return this.http.post(`${this.billURL}`, bill, {
      observe: 'response',
      headers: this.headers,
    });
  }
}
