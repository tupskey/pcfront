import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { ICandidate } from '../candidate/candidate.model';

@Injectable({
  providedIn: 'root'
})
export class PortalService {
  baseUrl = 'http://localhost:3000/api'
  headers = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private http: HttpClient) {

   }

   getCandidates(): Observable<ICandidate[]>{
    return this.http.get<ICandidate[]>(`${this.baseUrl}/candidates-list`);
   }

   getCandidate(id: number): Observable<ICandidate>{
    return this.http.get<ICandidate>(`${this.baseUrl}/candidate/${id}`, {headers: this.headers})
    .pipe(map((res)=> {
      return res;
    }),
      catchError(this.errorMgmt)
      )
   }
   addCanidate(data: ICandidate) :Observable<ICandidate>{
     let url = `${this.baseUrl}/add-candidate`;
      return this.http.post<any>(url, data)
      .pipe(catchError(this.errorMgmt)
      )
   }

   updateCandidate(id:any, data: ICandidate){
     let url = `${this.baseUrl}/update/${id}`;
    return this.http.put(url, data, {headers: this.headers})
   }

   deleteCandidate(id): Observable<any>{
    let url = `${this.baseUrl}/delete-candidate/${id}`
    return this.http.delete(url, {headers: this.headers})
    .pipe(
      catchError(this.errorMgmt)
    )
   }

   postNotifications(){

   }

   errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
