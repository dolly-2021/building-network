import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})



export class LogoutComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.logout();
		this.router.navigateByUrl('/login');
  }
 
}
