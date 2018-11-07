import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { UserGetModel } from "./user.service";

export interface AuthenticationRequest {
  username: string;
  password: string;
  includeUserDetails: boolean;
}

export interface AuthenticationResponse {
  success: boolean;
  token: string;
  userId: string;
  userDetails: UserGetModel
}

@Injectable()
export class AuthenticationService {
  constructor(private httpClient: HttpClient) { }

  login(request: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.httpClient.post<AuthenticationResponse>('api/auth', request);
  }
}
