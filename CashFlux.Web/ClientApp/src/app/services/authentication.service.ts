import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { ServiceBase } from "../shared/service-base";

@Injectable()
export class AuthenticationService extends ServiceBase {
  public loggedIn = new BehaviorSubject<boolean>(localStorage.getItem('session') === undefined);

  constructor(protected httpClient: HttpClient) {
    super(httpClient, 'api/auth');
  }

  login(username: string, password: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.httpClient.post<AuthenticationModel>(this.endpointName, {
        username: username,
        password: password
      }).subscribe(result => {
        if (result.success) {
          localStorage.setItem('session', JSON.stringify(result))
        }
        this.loggedIn.next(result.success);
        resolve(result.success);
      })
    });
  }
}

export interface AuthenticationModel {
  success: boolean;
  token: string;
  userId: string;
}
