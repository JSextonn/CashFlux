import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export abstract class EntityService<TGetModel, TCreateModel, TPostModel, TDeleteModel> {
  protected constructor(protected httpClient: HttpClient, protected endpoint: string) { }

  add(postModel: TPostModel, endpoint: string = this.endpoint): Observable<TCreateModel> {
    return this.httpClient.post<TCreateModel>(endpoint, postModel);
  }

  get(id: string, endpoint: string = this.endpoint): Observable<TGetModel> {
    return this.httpClient.get<TGetModel>(`${endpoint}/${id}`);
  }

  delete(id: string, endpoint: string = this.endpoint): Observable<TDeleteModel> {
    return this.httpClient.delete<TDeleteModel>(`${endpoint}/${id}`)
  }
}
