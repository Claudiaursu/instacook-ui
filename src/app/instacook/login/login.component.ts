import { Component } from '@angular/core';
import { AuthService } from '../../services/api/auth.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginDto } from '../dto/login';
import { Store } from '@ngrx/store';
import { InstacookState } from '../store/instacook.reducer';
import { loadLoggedUser } from '../store/instacook.actions';
import { loggedUserSelector } from '../store/instacook.selectors';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { UserDto } from '../dto/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  private unsubscribe$ = new Subject<void>();
  user$ = new BehaviorSubject<UserDto | null>(null);


  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<{instacook: InstacookState}>,

    ) {}

  login(): void {
    const newLogin = new LoginDto(this.username, this.password);
    this.authService.getUserByCredentials(newLogin).subscribe((authResult) => {
      if (authResult.isAuthenticated) {
        this.store.dispatch(loadLoggedUser({userId: authResult.id}))
        console.log("000000", authResult)


        this.store.select(loggedUserSelector)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((result) =>{
          //this.user$.next(result)
          console.log("%%%%%", result)
        })

        const navigationExtras: NavigationExtras = {
          skipLocationChange: true,
        };

        this.router.navigate(["/recipes"], navigationExtras);
      } else {
        alert('Invalid credentials');
      }
    });
  }
}
