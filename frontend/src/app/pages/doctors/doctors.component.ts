import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  doctors: any[] = [];

  //  FORM 
  name: string = '';
  specialization: string = '';
  experience: number | null = null;
  fees: number | null = null;
  phone: string = '';
  available: boolean = true;

  //  EDIT MODE 
  isEditMode: boolean = false;
  selectedDoctorId: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  //  LOAD 
  loadDoctors() {
    this.userService.getDoctors().subscribe({
      next: (res: any) => {
        this.doctors = res;
      },
      error: (err) => {
        console.log("Load Doctors Error:", err);
      }
    });
  }

  //  ADD 
  addDoctor() {
    if (!this.name || !this.specialization || this.experience === null || this.fees === null) {
      alert("Please fill all required fields ❗");
      return;
    }

    const data = {
      name: this.name,
      specialization: this.specialization,
      experience: this.experience,
      fees: this.fees,
      phone: this.phone,
      available: this.available
    };

    this.userService.addDoctor(data).subscribe({
      next: () => {
        alert("Doctor added successfully ");
        this.resetForm();
        this.loadDoctors();
      },
      error: (err) => {
        console.log("Add Doctor Error:", err);
        alert("Error adding doctor ");
      }
    });
  }

  //  EDIT CLICK 
  editDoctor(doc: any) {
    this.isEditMode = true;
    this.selectedDoctorId = doc._id;

    this.name = doc.name || '';
    this.specialization = doc.specialization || '';
    this.experience = doc.experience ?? null;
    this.fees = doc.fees ?? null;
    this.phone = doc.phone || '';
    this.available = doc.available ?? true;
  }

  //  UPDATE 
  updateDoctor() {
    if (!this.selectedDoctorId) return;

    const data = {
      name: this.name,
      specialization: this.specialization,
      experience: this.experience,
      fees: this.fees,
      phone: this.phone,
      available: this.available
    };

    this.userService.updateDoctor(this.selectedDoctorId, data).subscribe({
      next: () => {
        alert("Doctor updated successfully ✏️");
        this.resetForm();
        this.loadDoctors();
      },
      error: (err) => {
        console.log("Update Doctor Error:", err);
        alert("Error updating doctor ❌");
      }
    });
  }

  //  DELETE 
  deleteDoctor(id: string) {
    if (!confirm("Are you sure you want to delete this doctor?")) return;

    this.userService.deleteDoctor(id).subscribe({
      next: () => {
        alert("Doctor deleted 🗑️");
        this.loadDoctors();
      },
      error: (err) => {
        console.log("Delete Doctor Error:", err);
        alert("Error deleting doctor ❌");
      }
    });
  }

  //  RESET 
  resetForm() {
    this.name = '';
    this.specialization = '';
    this.experience = null;
    this.fees = null;
    this.phone = '';
    this.available = true;

    this.isEditMode = false;
    this.selectedDoctorId = '';
  }
}