import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Ilocation } from '../Interface,enum/locations';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  urlLocations:string="http://localhost:5294/api/Location";
  constructor(private http:HttpClient) { }
  getLocations():Observable<Ilocation[]>{
    return this.http.get<Ilocation[]>(this.urlLocations).pipe(catchError((err)=>
    {
      return throwError(()=>err.message || "server Error")
    }));
  }
}
