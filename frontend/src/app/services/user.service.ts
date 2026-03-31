import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  //  COMMON HEADER
  private getAuthHeaders() {
    const token = localStorage.getItem("token");
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  //  AUTH APIs 

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/login`, data);
  }

  // PATIENT APIs 

  getPatients(): Observable<any> {
    return this.http.get(`${this.baseUrl}/patients`, this.getAuthHeaders());
  }

  addPatient(data: any) {
    return this.http.post(`${this.baseUrl}/patients`, data, this.getAuthHeaders());
  }

  deletePatient(id: string) {
    return this.http.delete(`${this.baseUrl}/patients/${id}`, this.getAuthHeaders());
  }

  getPatientCount() {
    return this.http.get(`${this.baseUrl}/patients/count`, this.getAuthHeaders());
  }

  updatePatient(id: string, data: any) {
    return this.http.put(`${this.baseUrl}/patients/${id}`, data, this.getAuthHeaders());
  }

  // APPOINTMENT APIs

  createAppointment(data: any) {
    return this.http.post(`${this.baseUrl}/appointments`, data, this.getAuthHeaders());
  }

  getAppointments() {
    return this.http.get(`${this.baseUrl}/appointments`, this.getAuthHeaders());
  }

  updateAppointment(id: string, data: any) {
    return this.http.put(`${this.baseUrl}/appointments/${id}`, data, this.getAuthHeaders());
  }

  deleteAppointment(id: string) {
    return this.http.delete(`${this.baseUrl}/appointments/${id}`, this.getAuthHeaders());
  }

  getAppointmentCount() {
    return this.http.get(`${this.baseUrl}/appointments/count`, this.getAuthHeaders());
  }

  getAppointmentStats() {
    return this.http.get(`${this.baseUrl}/appointments/stats`, this.getAuthHeaders());
  }

  // DOCTOR APIs 

  // ✅ GET ALL DOCTORS
  getDoctors() {
    return this.http.get(`${this.baseUrl}/doctors`, this.getAuthHeaders());
  }

  // ✅ ADD DOCTOR
  addDoctor(data: any) {
    return this.http.post(`${this.baseUrl}/doctors`, data, this.getAuthHeaders());
  }

  // ✅ UPDATE DOCTOR
  updateDoctor(id: string, data: any) {
    return this.http.put(`${this.baseUrl}/doctors/${id}`, data, this.getAuthHeaders());
  }

  // ✅ DELETE DOCTOR
  deleteDoctor(id: string) {
    return this.http.delete(`${this.baseUrl}/doctors/${id}`, this.getAuthHeaders());
  }

  // ✅ GET SINGLE DOCTOR 
  getDoctorById(id: string) {
    return this.http.get(`${this.baseUrl}/doctors/${id}`, this.getAuthHeaders());
  }
    getDoctorCount() {
    return this.http.get(`${this.baseUrl}/doctors/count`, this.getAuthHeaders());
  }

}