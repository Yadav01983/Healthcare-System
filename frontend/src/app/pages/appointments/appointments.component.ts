import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  appointments: any[] = [];
  patients: any[] = [];
  doctors: any[] = [];

  // FORM 
  selectedPatient: string = '';
  selectedDoctor: string = '';
  date: string = '';
  time: string = '';
  reason: string = '';

  //  EDIT MODE 
  isEditMode: boolean = false;
  selectedAppointmentId: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadAppointments();
    this.loadPatients();
    this.loadDoctors();
  }

  //  LOAD APPOINTMENTS
  loadAppointments() {
    this.userService.getAppointments().subscribe({
      next: (res: any) => {
        this.appointments = res;
      },
      error: (err) => {
        console.log("Error loading appointments:", err);
      }
    });
  }

  //  LOAD PATIENTS
  loadPatients() {
    this.userService.getPatients().subscribe({
      next: (res: any) => {
        this.patients = res;
      },
      error: (err) => {
        console.log("Error loading patients:", err);
      }
    });
  }

  // LOAD DOCTORS 
  loadDoctors() {
    this.userService.getDoctors().subscribe({
      next: (res: any) => {
        this.doctors = res;
      },
      error: (err) => {
        console.log("Error loading doctors:", err);
      }
    });
  }

  //  ADD APPOINTMENT 
  addAppointment() {
    
    if (!this.selectedPatient || !this.selectedDoctor || !this.date || !this.time) {
      alert("Please fill all required fields ❗");
      return;
    }

    const data = {
      patient: this.selectedPatient,
      doctor: this.selectedDoctor,
      date: this.date,
      time: this.time,
      reason: this.reason
    };

    this.userService.createAppointment(data).subscribe({
      next: () => {
        alert("Appointment created successfully ");
        this.resetForm();
        this.loadAppointments();
      },
      error: (err) => {
        console.log("Create Error:", err);
        alert("Error creating appointment ");
      }
    });
  }

  //  EDIT CLICK 
  editAppointment(appt: any) {
    this.isEditMode = true;
    this.selectedAppointmentId = appt._id;

    this.selectedPatient = appt.patient?._id || '';
    this.selectedDoctor = appt.doctor?._id || '';
    this.date = appt.date ? appt.date.split('T')[0] : '';
    this.time = appt.time || '';
    this.reason = appt.reason || '';
  }

  //  UPDATE APPOINTMENT 
  updateAppointment() {
    if (!this.selectedPatient || !this.selectedDoctor || !this.date || !this.time) {
      alert("Please fill all required fields ❗");
      return;
    }

    const data = {
      patient: this.selectedPatient,
      doctor: this.selectedDoctor,
      date: this.date,
      time: this.time,
      reason: this.reason
    };

    this.userService.updateAppointment(this.selectedAppointmentId, data).subscribe({
      next: () => {
        alert("Appointment updated successfully ✏️");
        this.resetForm();
        this.loadAppointments();
      },
      error: (err) => {
        console.log("Update Error:", err);
        alert("Error updating appointment ");
      }
    });
  }

  //  STATUS CHANGE 
  changeStatus(id: string, status: string) {
    this.userService.updateAppointment(id, { status }).subscribe({
      next: () => {
        this.loadAppointments();
      },
      error: (err) => {
        console.log("Status Update Error:", err);
      }
    });
  }

  //  DELETE
  deleteAppointment(id: string) {
    if (!confirm("Are you sure you want to delete this appointment?")) return;

    this.userService.deleteAppointment(id).subscribe({
      next: () => {
        alert("Appointment deleted successfully 🗑️");
        this.loadAppointments();
      },
      error: (err) => {
        console.log("Delete Error:", err);
      }
    });
  }

  //  RESET 
  resetForm() {
    this.selectedPatient = '';
    this.selectedDoctor = '';
    this.date = '';
    this.time = '';
    this.reason = '';
    this.isEditMode = false;
    this.selectedAppointmentId = '';
  }
}