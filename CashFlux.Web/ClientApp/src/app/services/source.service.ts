import { EntityService } from "./entity.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface SourceGetModel {
  id: string;
  name: string;
  category: string;
  timeCreated: Date;
}

export interface SourcePostModel {
  userId: string;
  name: string;
  category: string;
}

export interface SourceCloudDeleteMultipleModel {
  userId: string;
  sourceIds: string[];
}

export interface SourceMainDeleteMultipleModel {
  cloudModel: SourceCloudDeleteMultipleModel;
  reduxIds: string[];
}

export interface SourceDeleteResult {
  userId: string;
  sourceDeletedFromUser: SourceGetModel;
}

export interface SourcePutModel {

}

export interface SourceDeleteMultipleResult {
  userId: string;
  sourcesDeletedFromUser: SourceGetModel[];
}

@Injectable()
export class SourceService
  extends EntityService<SourceGetModel, SourceGetModel, SourcePostModel, SourcePutModel, SourceDeleteResult> {
  constructor(protected httpClient: HttpClient) {
    super(httpClient, 'api/usersource');
  }

  add(postModel: SourcePostModel): Observable<SourceGetModel> {
    return this.httpClient.post<SourceGetModel>(`${this.endpoint}/withsource`, postModel);
  }

  deleteMultiple(model: SourceCloudDeleteMultipleModel): Observable<SourceDeleteMultipleResult> {
    return this.httpClient.request<SourceDeleteMultipleResult>(
      'delete',
      `${this.endpoint}/multiple`, {
        body: model
      });
  }
}
