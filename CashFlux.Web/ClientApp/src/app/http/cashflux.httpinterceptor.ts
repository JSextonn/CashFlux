import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class CashFluxHttpInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Modifying headers to automatically attack token
    //    request = request.clone({
    //      setHeaders: {
    //        Authorization: `Bearer ${this.auth.getToken()}`
    //      }
    //    });

    const url = 'http://localhost:5000';
    request = request.clone({
      url: `${url}/${request.url}`
    });
    return next.handle(request);
  }
}
