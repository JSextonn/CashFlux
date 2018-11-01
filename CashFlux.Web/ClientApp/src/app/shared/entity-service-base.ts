import { ServiceBase } from "./service-base";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export class EntityServiceBase<TModel, TPostModel, TDeleteModel> extends ServiceBase {
  constructor(protected httpClient: HttpClient, protected endpointName: string) {
    super(httpClient, endpointName);
  }

  get(id: string): Observable<TModel> {
    return this.httpClient.get<TModel>(`${this.endpointName}/${id}`);
  }

  post(postModel: TPostModel): Observable<TModel> {
    return this.httpClient.post<TModel>(this.endpointName, postModel);
  }

  delete(id: string): Observable<TDeleteModel> {
    return this.httpClient.delete<TDeleteModel>(`${this.endpointName}/${id}`);
  }
}
