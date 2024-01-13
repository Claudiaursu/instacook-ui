import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of, takeUntil } from 'rxjs';
import { UserDto } from '../../instacook/dto/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoginDto } from '../../instacook/dto/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  private api = environment.user_interaction_api + '/users';
  private unsubscribe$ = new Subject<void>();
  loggedUser$ = new BehaviorSubject<UserDto[]>([]);

  constructor(private httpClient: HttpClient) {}

  // login(username: string, password: string): Observable<any> {
  //   // Perform authentication logic here, e.g., API call or checking credentials
  //   const loginDto = new LoginDto(username, password);
  //   this.getUserByCredentials(loginDto).
  //   pipe(takeUntil(this.unsubscribe$))
  //   .subscribe({
  //     next: (loggedUser) => {
  //       this.loggedUser$.next(loggedUser);
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     },
  //   });

  // }

  getUserByCredentials(login: LoginDto) {
    return this.httpClient.post<any>(`${this.api}/login`, login);
  }

  getCurrentUserDetails(userId: string): Observable<UserDto> {
    return this.httpClient.get<UserDto>(`${this.api}/${userId}`);
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
  }
}
