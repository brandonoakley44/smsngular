import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  private user: SocialUser;
  private loggedIn: boolean;

  constructor(private authService: SocialAuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = ( user != null);
    })

      this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    })
  }

  signOut(): void {
    this.authService.signOut().then(() => {

      this.router.navigate(['/login']);
    });
  }

}
