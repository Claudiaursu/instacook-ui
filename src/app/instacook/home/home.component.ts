import { Component } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { UserDto } from '../dto/user';
// import { Store } from '@ngrx/store';
import { Router, RouterModule } from '@angular/router'; // Import RouterModule
import { AuthService } from '../../services/api/auth.service';
import { loggedUserSelector } from '../store/instacook.selectors';
import { Store } from '@ngrx/store';
import { InstacookState } from '../store/instacook.reducer';
import { loadLoggedUser } from '../store/instacook.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  isAuthenticated: boolean = false;
  username: string = '';
  user$ = new BehaviorSubject<UserDto | null>(null);
  private unsubscribe$ = new Subject<void>();


  constructor(
    private authService: AuthService,
    private store: Store<{instacook: InstacookState}>,
    private router: Router
    ) 
    {}


  ngOnInit(): void {

    this.store.select(loggedUserSelector)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((result) => {
      if(result?.id) {
        this.username = result?.nume || '';
        this.isAuthenticated = true;
      }
    })
  }

  logout(): void {
    this.authService.logout();
  }

  navigateTo(link: string): void {
    this.router.navigate([link]);
  }

}
