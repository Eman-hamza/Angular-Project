import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Icategory } from '../Interface,enum/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  urlCategories:string="http://localhost:5294/api/Category";
  constructor(private http:HttpClient) { }
  getCategories():Observable<Icategory[]>{
    return this.http.get<Icategory[]>(this.urlCategories).pipe(catchError((err)=>{
      return throwError(()=>err.message || "server Error")
    }))
  }
}
