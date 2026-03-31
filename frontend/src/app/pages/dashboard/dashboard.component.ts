import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //  COUNTS 
  totalPatients: number = 0;
  totalAppointments: number = 0;
  totalDoctors: number = 0; 

  // STATUS ANALYTICS 
  pendingAppointments: number = 0;
  completedAppointments: number = 0;
  cancelledAppointments: number = 0;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  //  INIT 
  ngOnInit(): void {
    this.loadData();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadData();
      });
  }

  //  LOAD ALL
  loadData() {
    this.getPatientCount();
    this.getAppointmentCount();
    this.getDoctorCount(); 
    this.getAppointmentStats();
  }

  // PATIENT COUNT 
  getPatientCount() {
    this.userService.getPatientCount().subscribe({
      next: (res: any) => {
        this.totalPatients = res?.totalPatients || 0;
      },
      error: (err: any) => {
        console.log("Patient Count Error:", err);
      }
    });
  }

  //  APPOINTMENT COUNT
  getAppointmentCount() {
    this.userService.getAppointmentCount().subscribe({
      next: (res: any) => {
        this.totalAppointments = res?.totalAppointments || 0;
      },
      error: (err: any) => {
        console.log("Appointment Count Error:", err);
      }
    });
  }

  //  DOCTOR COUNT
  getDoctorCount() {
    this.userService.getDoctorCount().subscribe({
      next: (res: any) => {
        this.totalDoctors = res?.totalDoctors || 0;
      },
      error: (err: any) => {
        console.log("Doctor Count Error:", err);
      }
    });
  }

  //  STATUS ANALYTICS 
  getAppointmentStats() {
    this.userService.getAppointmentStats().subscribe({
      next: (res: any) => {
        this.pendingAppointments = res?.pending || 0;
        this.completedAppointments = res?.completed || 0;
        this.cancelledAppointments = res?.cancelled || 0;
      },
      error: (err: any) => {
        console.log("Stats Error:", err);
      }
    });
  }

  // LOGOUT 
  logout() {
    localStorage.removeItem("token");
    this.router.navigate(['/']);
  }
}