import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EntityService } from "./entity.service";

export interface ProfileGetModel {
  id: string;
  name: string;
  timeCreated: Date;
}

export interface ProfilePostModel {
  userId: string;
  name: string;
}

export interface ProfileDeleteModel {
  deletedProfile: string;
  deletedFluxIds: string[];
}

@Injectable()
export class ProfileService extends EntityService<ProfileGetModel, ProfilePostModel, ProfileDeleteModel> {
  constructor(protected httpClient: HttpClient) {
    super(httpClient, 'api/profile');
  }
}
