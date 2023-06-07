import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IJob } from '../Interface,enum/IJob';
import { ActivatedRoute } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JopServiceService {

  currentuser:any
  constructor(private http:HttpClient , activeroute : ActivatedRoute) 
  { 

  }

  Getjob(jobId:any):Observable<IJob> {
    //return this.http.get<IJob>(`http://localhost:5294/api/Job/3`)
    return this.http.get<IJob>(`http://localhost:5294/api/Jobs/${jobId}`)
  }

  gettokenID(): string {
    let token: any = localStorage.getItem("userInfo");
    this.currentuser = jwtDecode(token);
    var nameIdentifier = this.currentuser['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    console.log(nameIdentifier);
    return nameIdentifier;
  }

}


