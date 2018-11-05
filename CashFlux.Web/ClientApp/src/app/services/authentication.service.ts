import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

export interface AuthenticationCredentials {
  username: string;
  password: string;
}

export interface AuthenticationResponse {
  success: boolean;
  token: string;
  userId: string;
}

@Injectable()
export class AuthenticationService {
  constructor(private httpClient: HttpClient) { }

  login(credentials: AuthenticationCredentials): Observable<AuthenticationResponse> {
    return this.httpClient.post<AuthenticationResponse>('api/auth', credentials);
  }
}
