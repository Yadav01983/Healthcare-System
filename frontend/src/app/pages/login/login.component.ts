import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  login() {
    const data = {
      email: this.email,
      password: this.password
    };

    this.userService.login(data).subscribe({
      next: (res) => {
        console.log(res);

        localStorage.setItem("token", res.token);

        alert("Login Successful");

        
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log(err);
        alert("Login Failed");
      }
    });
  }
}