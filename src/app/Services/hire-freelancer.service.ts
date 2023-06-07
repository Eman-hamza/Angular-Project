import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Ihire } from '../Interface,enum/HireFreelancer';
import { IgettingHireJobs } from '../Interface,enum/gettingHireJobs';

@Injectable({
  providedIn: 'root'
})
export class HireFreelancerService {

  constructor(private http:HttpClient) { }
  AddHireFreelancer(HireFreelancer:Ihire):Observable<Ihire>{
    return this.http.post<Ihire>(`http://localhost:5294/api/Hire`,HireFreelancer);
  }
  getAllHireJobs(currentUser:any):Observable<IgettingHireJobs[]>{
   return this.http.get<IgettingHireJobs[]>(`http://localhost:5294/api/Hire/${currentUser}`);
  }
}
