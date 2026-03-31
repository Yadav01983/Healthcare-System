import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  name = '';
  email = '';
  password = '';
  phone = '';

  constructor(private userService: UserService) {}

  register() {
    const data = {
      name: this.name,
      email: this.email,
      password: this.password,
      phone: this.phone
    };

    this.userService.register(data).subscribe({
      next: (res) => {
        console.log(res);
        alert("Registration Successful");
      },
      error: (err) => {
        console.log(err);
        alert("Registration Failed");
      }
    });
  }
}