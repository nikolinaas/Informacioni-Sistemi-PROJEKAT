import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EducatorsService {
  constructor(private http: HttpClient) {}

  private educatorsURL = 'http://10.99.145.167:8080/Server/api/educators';

  getEducators() {
    return this.http.get(`${this.educatorsURL}`);
  }

  createEducator(educator: any) {
    return this.http.post(`${this.educatorsURL}`, educator, {observe: 'response'});
  }

  deleteEducator(id?: number) {
    return this.http.delete(`${this.educatorsURL}/${id}`, {observe: 'response'});
  }
  getEducator(id?: number) {
    return this.http.get(`${this.educatorsURL}/${id}`, {observe: 'response'});
  }

  getMedicalFile(id?: number) {
    return this.http.get(`${this.educatorsURL}/${id}/medicalClearance`, {responseType: 'arraybuffer'});
  }

  updateMedicalFile(medicalClearance:any, id?: number){
    return this.http.put(`${this.educatorsURL}/${id}/medicalClearance`, medicalClearance);
  }
  getHygieneFile(id?: number) {
    return this.http.get(`${this.educatorsURL}/${id}/hygieneTest`, {responseType: 'arraybuffer'});
  }

  updateHygieneFile(hygieneTest:any, id?: number){
    return this.http.put(`${this.educatorsURL}/${id}/hygieneTest`, hygieneTest);
  }

  updateEducator(educator: any, id: number) {
    return this.http.put(`${this.educatorsURL}/${id}`, educator);
  }
}