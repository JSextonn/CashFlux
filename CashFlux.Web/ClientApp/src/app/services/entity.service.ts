import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export abstract class EntityService<TGetModel, TCreateModel, TPostModel, TDeleteModel> {
  protected constructor(protected httpClient: HttpClient, protected endpoint: string) { }

  add(postModel: TPostModel): Observable<TCreateModel> {
    return this.httpClient.post<TCreateModel>(this.endpoint, postModel);
  }

  get(id: string): Observable<TGetModel> {
    return this.httpClient.get<TGetModel>(`${this.endpoint}/${id}`);
  }

  delete(id: string): Observable<TDeleteModel> {
    return this.httpClient.delete<TDeleteModel>(`${this.endpoint}/${id}`)
  }
}
