import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs/index";
import {catchError} from "rxjs/internal/operators/catchError";


@Injectable({
    providedIn: 'root'
})
export class Interceptor implements HttpInterceptor{

    intercept(request: HttpRequest<any>, next: HttpHandler):Observable<any>{
        let token = window.localStorage.getItem('token');
        if(token){
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer' + ' ' + token,
                }
            });
        }
        return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
            if(error.error instanceof ErrorEvent){
                errorMessage = 'Error: ' + error.error.message;
            }
            else {
                errorMessage = 'Error Code: ' + error.status + ' message: ' + error.message +'!Opps Some Internal Server Error';
            }
            window.alert(errorMessage);
            return throwError(errorMessage);
            })
        );
    }

    constructor() { }
}
