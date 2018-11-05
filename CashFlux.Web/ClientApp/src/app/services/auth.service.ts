import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  userId: string;
}

export interface RegisterCredentials {
  username: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string
}

export interface RegisterResponse {
  userId: string;
  token: string;
}

@Injectable()
export class AuthenticationService {
  constructor(private httpClient: HttpClient) { }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>('api/auth', credentials);
  }

  register(credentials: RegisterCredentials): Observable<RegisterResponse> {
    return this.httpClient.post<RegisterResponse>('api/user', credentials);
  }
}
