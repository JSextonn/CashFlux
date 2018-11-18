import { EntityService } from "./entity.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface FluxGetModel {

}

export interface FluxPostModel {

}

export interface FluxPutModel {

}

export interface FluxDeleteModel {

}

@Injectable()
export class FluxService
  extends EntityService<FluxGetModel, FluxGetModel, FluxPostModel, FluxPutModel, FluxDeleteModel> {
  constructor(protected httpClient: HttpClient) {
    super(httpClient, 'api/flux');
  }
}
