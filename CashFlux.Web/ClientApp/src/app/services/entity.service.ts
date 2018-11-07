import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export abstract class EntityService<TGetModel, TPostModel, TDeleteModel> {
  protected constructor(protected httpClient: HttpClient, protected endpoint: string) { }

  add(postModel: TPostModel): Observable<TGetModel> {
    return this.httpClient.post<TGetModel>(this.endpoint, postModel);
  }

  delete(id: string): Observable<TDeleteModel> {
    return this.httpClient.delete<TDeleteModel>(`${this.endpoint}/${id}`)
  }
}