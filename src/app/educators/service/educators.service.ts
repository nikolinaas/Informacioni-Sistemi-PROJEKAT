import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EducatorsService {
  constructor(private http: HttpClient) {}

  private educatorsURL = 'http://localhost:8080/Server/api/educators';

  private headers = new HttpHeaders().set(
    'Authorization',
    'Bearer ' + sessionStorage.getItem('auth')
  );

  getEducators() {
    return this.http.get(`${this.educatorsURL}`, {
      headers: this.headers,
    });
  }

  createEducator(educator: any) {
    return this.http.post(`${this.educatorsURL}`, educator, {
      observe: 'response',
    });
  }

  deleteEducator(id?: number) {
    return this.http.delete(`${this.educatorsURL}/${id}`, {
      observe: 'response',
    });
  }

  getEducator(id?: number) {
    return this.http.get(`${this.educatorsURL}/${id}`, { observe: 'response', headers: this.headers });
  }

  getMedicalFile(id?: number) {
    return this.http.get(`${this.educatorsURL}/${id}/medicalClearance`, {
      responseType: 'arraybuffer', headers: this.headers
    });
  }

  updateMedicalFile(medicalClearance: any, id?: number) {
    return this.http.put(
      `${this.educatorsURL}/${id}/medicalClearance`,
      medicalClearance
    );
  }
  getHygieneFile(id?: number) {
    return this.http.get(`${this.educatorsURL}/${id}/hygieneTest`, {
      responseType: 'arraybuffer', headers: this.headers
    });
  }

  updateHygieneFile(hygieneTest: any, id?: number) {
    return this.http.put(`${this.educatorsURL}/${id}/hygieneTest`, hygieneTest);
  }

  updateEducator(educator: any, id: number) {
    return this.http.put(`${this.educatorsURL}/${id}`, educator);
  }
}
