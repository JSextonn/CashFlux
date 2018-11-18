import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ProfileGetModel } from "./profile.service";
import { SourceGetModel } from "./source.service";
import { EntityService } from "./entity.service";

export interface UserGetModel {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  timeCreated: Date;
  profiles: ProfileGetModel[];
  sources: SourceGetModel[];
}

export interface UserCreateModel {
  userId: string;
  token: string;
  userDetails: UserGetModel;
}

export interface UserPostModel {
  username: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
  includeUserDetails: boolean;
}

export interface UserPutModel {

}

export interface UserDeleteModel {
  deletedUser: string;
  deletedFluxes: string[];
  deletedProfiles: string[];
}

@Injectable()
export class UserService
  extends EntityService<UserGetModel, UserCreateModel, UserPostModel, UserPutModel, UserDeleteModel> {
  constructor(protected httpClient: HttpClient) {
    super(httpClient, 'api/user');
  }
}
