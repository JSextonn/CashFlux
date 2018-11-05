import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

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
export class RegisterService {
  constructor(private httpClient: HttpClient) { }

  register(credentials: RegisterCredentials): Observable<RegisterResponse> {
    return this.httpClient.post<RegisterResponse>('api/user', credentials);
  }
}
