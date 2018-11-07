import { EntityService } from "./entity.service";
import { HttpClient } from "@angular/common/http";
import { FluxSource } from "../redux/reducers/source.reducer";
import { Injectable } from "@angular/core";

export interface SourceGetModel {
  id: string;
  name: string;
  category: string;
  timeCreated: Date;
}

export interface SourcePostModel {
  name: string;
  category: string;
}

export interface SourceDeleteModel {
  userDeletedFrom: string;
  sourceDeleted: string;
}

@Injectable()
export class SourceService extends EntityService<SourceGetModel, SourceGetModel, SourcePostModel, SourceDeleteModel> {
  constructor(protected httpClient: HttpClient) {
    super(httpClient, 'api/source');
  }
}

export function mapSourceResponseToClientSource(sources: SourceGetModel[]): FluxSource[] {
  return sources.map(source => {
    return {
      cloudId: source.id,
      name: source.name,
      category: source.category,
      timeCreated: source.timeCreated
    };
  });
}
