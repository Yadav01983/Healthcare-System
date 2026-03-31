import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { authGuard } from './guards/auth.guard';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';


export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'patients', component: PatientsComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'doctors', component: DoctorsComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] } 
];