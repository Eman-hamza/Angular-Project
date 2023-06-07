import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { Job } from '../Interface,enum/Job';
@Injectable({
  providedIn: 'root'
})
export class JobServiceService {

  constructor(private _httpClient:HttpClient,private route:Router) { 
    if(localStorage.getItem('userInfo')!=null){
      this.saveData();
    }
  }
  userdata= new BehaviorSubject(null);
  saveData(){
    let encodeData=JSON.stringify(localStorage.getItem('userInfo'));
    this.userdata.next(jwtDecode(encodeData));
    console.log(this.userdata);
  }

  AddJob(formDta:any):Observable<any>
  {
   return this._httpClient.post<any>("http://localhost:5294/api/ClientJobs/AddNewJob",formDta)
  }
}
