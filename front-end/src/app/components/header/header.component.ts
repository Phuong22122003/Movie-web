import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../service/authentication';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isLoggedIn = false;
  constructor(private crd: ChangeDetectorRef,
    private authService: AuthenticationService,
    private router: Router){}
  ngOnInit(){
    let jwt = localStorage.getItem('jwt');
    console.log(jwt);
    
    if(jwt != null) this.isLoggedIn = true;
    this.crd.detectChanges(); 
  }
  logout(){
    this.authService.logout();
    this.isLoggedIn = false;
  }
}
