import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Ijob } from '../Interface,enum/jobs';
import { Ilocation } from '../Interface,enum/locations';
import { Icategory } from '../Interface,enum/categories';
import { ISavedJob } from '../Interface,enum/SavedJob';
import { Idisplay } from '../Interface,enum/IdisoalyJob';

@Injectable({
  providedIn: 'root'
})
export class JobsService  {
//urlJobs:string="http://localhost:5294/api/DisplayingJobWithClient";
  constructor(private http:HttpClient) { }
  
  getJobs(currentUserId:any):Observable<Idisplay[]>{
   return this.http.get<Idisplay[]>(`http://localhost:5294/api/DisplayingJobWithClient/${currentUserId}`).pipe(catchError((err)=>{
    return throwError(()=>err.message || "Server Error")
   }));
  }

  getJobsLocation(id:any):Observable<Ilocation>{
    return this.http.get<Ilocation>(`http://localhost:5294/api/Location/${id}`).pipe(catchError((err)=>{
     return throwError(()=>err.message || "Server Error")
    }));
   }

   getJobsCategory(id:any):Observable<Icategory>{
    return this.http.get<Icategory>(`http://localhost:5294/api/Category/${id}`).pipe(catchError((err)=>{
     return throwError(()=>err.message || "Server Error")
    }));
    }
   
    AddJobSaved(savedJob:any):Observable<ISavedJob>{
      return this.http.post<ISavedJob>(`http://localhost:5294/api/FreelancerJob/AddSavedJob`,savedJob);
    }
    getSavedJob(currentUserId:any):Observable<Ijob[]>{
      return this.http.get<Ijob[]>(`http://localhost:5294/api/FreelancerJob/${currentUserId}`);
    }
    DeleteSavedJob(jobId:any):Observable<ISavedJob>{
      return this.http.delete<ISavedJob>(`http://localhost:5294/api/FreelancerJob/${jobId}`);
    }
     getCountSavedJob(currentUserId:any){
      return this.http.get(`http://localhost:5294/api/FreelancerJob/CountSavedJobs/${currentUserId}`);
    } 
    getClientJobs(currentUserId:any):Observable<Ijob[]>{
      return this.http.get<Ijob[]>(`http://localhost:5294/api/ClientJobs/${currentUserId}`);
    }
    getByHour():Observable<Ijob[]>{
      return this.http.get<Ijob[]>(`http://localhost:5294/api/Category/GetTheJobByHours`);
    }
    getByFixedPrice():Observable<Ijob[]>{
      return this.http.get<Ijob[]>(`http://localhost:5294/api/Category/GetTheJobByFixedPrice`);
    }
   }
  


