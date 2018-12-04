import { EntityService } from "./entity.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SourceGetModel } from "./source.service";
import { Observable } from "rxjs";

export interface FluxGetModel {
  id: string;
  amount: number;
  source: SourceGetModel;
  timeOccurred: Date;
  timeCreated: Date;
}

export interface FluxPostModel {
  amount: number;
  profileId: string;
  sourceId: string;
  timeOccurred: Date;
}

export interface FluxPutModel {

}

export interface FluxDeleteModel {
  id: string;
}

export interface FluxDeleteMultipleModel {
  ids: string[];
}

export interface FluxDeleteMultipleResult {
  ids: string[];
}

@Injectable()
export class FluxService
  extends EntityService<FluxGetModel, FluxGetModel, FluxPostModel, FluxPutModel, FluxDeleteModel> {
  constructor(protected httpClient: HttpClient) {
    super(httpClient, 'api/flux');
  }

  deleteMultiple(model: FluxDeleteMultipleModel): Observable<FluxDeleteMultipleResult> {
    return this.httpClient.request<FluxDeleteMultipleResult>(
      'delete',
      `${this.endpoint}/multiple`, {
        body: model.ids
      }
    )
  }
}
