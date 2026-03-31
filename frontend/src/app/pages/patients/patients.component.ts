import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  // MAIN DATA 
  patients: any[] = [];
  filteredPatients: any[] = [];

  //  SEARCH 
  searchText: string = '';

  //  FORM 
  name: string = '';
  email: string = '';
  age: number | null = null;
  phone: string = '';

  //  EDIT MODE 
  isEditMode: boolean = false;
  selectedPatientId: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  // LOAD 
  loadPatients() {
    this.userService.getPatients().subscribe({
      next: (res: any) => {
        this.patients = res || [];
        this.filteredPatients = [...this.patients]; 
      },
      error: (err) => {
        console.log("Load Patients Error:", err);
      }
    });
  }

  //  SEARCH 
  filterPatients() {
    const text = this.searchText.trim().toLowerCase();

    if (!text) {
      this.filteredPatients = [...this.patients]; 
      return;
    }

    this.filteredPatients = this.patients.filter((p: any) =>
      (p.name || '').toLowerCase().includes(text) ||
      (p.email || '').toLowerCase().includes(text)
    );
  }

  // ADD 
  addPatient() {
    if (!this.name || !this.email) {
      alert("Name and Email are required ❗");
      return;
    }

    const data = {
      name: this.name,
      email: this.email,
      age: this.age,
      phone: this.phone
    };

    this.userService.addPatient(data).subscribe({
      next: () => {
        alert("Patient added successfully ");
        this.resetForm();
        this.loadPatients();
      },
      error: (err) => {
        console.log("Add Patient Error:", err);
        alert("Error adding patient ");
      }
    });
  }

  // DELETE 
  deletePatient(id: string) {
    if (!confirm("Are you sure you want to delete this patient?")) return;

    this.userService.deletePatient(id).subscribe({
      next: () => {
        alert("Patient deleted 🗑️");
        this.loadPatients();
      },
      error: (err) => {
        console.log("Delete Patient Error:", err);
        alert("Error deleting patient ");
      }
    });
  }

  //  EDIT
  editPatient(patient: any) {
    this.isEditMode = true;
    this.selectedPatientId = patient._id;

    this.name = patient.name || '';
    this.email = patient.email || '';
    this.age = patient.age ?? null;
    this.phone = patient.phone || '';
  }

  // UPDATE 
  updatePatient() {
    if (!this.selectedPatientId) return;

    const data = {
      name: this.name,
      email: this.email,
      age: this.age,
      phone: this.phone
    };

    this.userService.updatePatient(this.selectedPatientId, data).subscribe({
      next: () => {
        alert("Patient updated ✏️");
        this.resetForm();
        this.loadPatients();
      },
      error: (err) => {
        console.log("Update Patient Error:", err);
        alert("Error updating patient ");
      }
    });
  }

  //  RESET 
  resetForm() {
    this.name = '';
    this.email = '';
    this.age = null;
    this.phone = '';

    this.isEditMode = false;
    this.selectedPatientId = '';
  }
}