import { EntityService } from "./entity.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface FluxGetModel {

}

export interface FluxPostModel {

}

export interface FluxDeleteModel {

}

@Injectable()
export class FluxService extends EntityService<FluxGetModel, FluxGetModel, FluxPostModel, FluxDeleteModel> {
  constructor(protected httpClient: HttpClient) {
    super(httpClient, 'api/flux');
  }
}
