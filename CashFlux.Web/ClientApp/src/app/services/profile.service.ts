import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EntityService } from "./entity.service";
import { FluxGetModel } from "./flux.service";

export interface ProfileGetModel {
  id: string;
  name: string;
  fluxes: FluxGetModel[];
  timeCreated: Date;
}

export interface ProfilePostModel {
  userId: string;
  name: string;
}

export interface ProfilePutModel {
  name: string;
}

export interface ProfileDeleteModel {
  deletedProfile: string;
  deletedFluxIds: string[];
}

@Injectable()
export class ProfileService
  extends EntityService<ProfileGetModel, ProfileGetModel, ProfilePostModel, ProfilePutModel, ProfileDeleteModel> {
  constructor(protected httpClient: HttpClient) {
    super(httpClient, 'api/profile');
  }
}
