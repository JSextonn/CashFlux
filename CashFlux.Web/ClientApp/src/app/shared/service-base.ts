import { HttpClient } from "@angular/common/http";

export class ServiceBase {
  constructor(protected httpClient: HttpClient, protected endpointName: string) { }
}
