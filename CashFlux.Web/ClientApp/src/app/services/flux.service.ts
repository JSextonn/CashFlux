import { EntityService } from "./entity.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SourceGetModel } from "./source.service";

export interface FluxGetModel {
  id: string;
  amount: number;
  source: SourceGetModel;
  timeCreated: Date;
}

export interface FluxPostModel {
  amount: number;
  profileId: string;
  sourceId: string;
}

export interface FluxPutModel {

}

export interface FluxDeleteModel {
  id: string;
}

@Injectable()
export class FluxService
  extends EntityService<FluxGetModel, FluxGetModel, FluxPostModel, FluxPutModel, FluxDeleteModel> {
  constructor(protected httpClient: HttpClient) {
    super(httpClient, 'api/flux');
  }
}
