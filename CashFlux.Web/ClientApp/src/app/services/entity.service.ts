import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Update } from "@ngrx/entity";

export interface EntityUpdate<TEntity> {
  cloudId: string;
  update: Update<TEntity>
}

export abstract class EntityService<TGetModel, TCreateModel, TPostModel, TPutModel, TDeleteModel> {
  protected constructor(protected httpClient: HttpClient, protected endpoint: string) { }

  add(postModel: TPostModel): Observable<TCreateModel> {
    return this.httpClient.post<TCreateModel>(this.endpoint, postModel);
  }

  get(id: string): Observable<TGetModel> {
    return this.httpClient.get<TGetModel>(`${this.endpoint}/${id}`);
  }

  update(id: string, putModel: TPutModel): Observable<TGetModel> {
    return this.httpClient.put<TGetModel>(`${this.endpoint}/${id}`, putModel);
  }

  delete(id: string): Observable<TDeleteModel> {
    return this.httpClient.delete<TDeleteModel>(`${this.endpoint}/${id}`)
  }
}
