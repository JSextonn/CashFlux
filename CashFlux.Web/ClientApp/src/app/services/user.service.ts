import { EntityServiceBase } from "../shared/entity-service-base";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UserService extends EntityServiceBase<UserModel, UserPostModel, UserDeleteModel> {
  constructor(protected httpClient: HttpClient) {
    super(httpClient, 'api/user');
  }
}

export interface UserModel {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  fullname: string;
  // TODO: Needs to include profiles and sources.
}

export interface UserPostModel {
  username: string;
  password: string;
  confirm: string;
  first?: string;
  last?: string;
}

export interface UserDeleteModel {
  deletedUser: string;
  deletedProfiles: string[];
  deletedFluxes: string[];
}
