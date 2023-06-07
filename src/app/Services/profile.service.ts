import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Iprofile } from '../Interface,enum/Iprofile';
import { Iprotofilo } from '../Interface,enum/Iprotofilo';
import { IprofileComplete } from '../Interface,enum/IprofileComplete';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  userdata= new BehaviorSubject(null);
  saveData(){
    let encodeData=JSON.stringify(localStorage.getItem('userInfo'));
    this.userdata.next(jwtDecode(encodeData));
    return this.userdata;
  }
  constructor(private _httpClient:HttpClient,private route:Router) { 
  }
  currentuser:any;
  gettokenID(): string {
    let token: any = localStorage.getItem("userInfo");
    this.currentuser = jwtDecode(token);
    var nameIdentifier = this.currentuser['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    //this.CurrentID=nameIdentifier;
    console.log(nameIdentifier);
    return nameIdentifier;
  } 
  // chooseuser( formDta:any):Observable<any>
  // {
  //  return this._httpClient.post("http://localhost:5294/api/Profile/NewCorF",formDta)
  // }
  ProfSubmit(formDta:any,head:any):Observable<any>
  {
   return this._httpClient.post<any>("http://localhost:5294/api/Profile/NewData",formDta,head)
  }
  ProfileImage(formDta:any):Observable<any>
  {
   return this._httpClient.put<any>(`http://localhost:5294/api/Profile/editImage/${this.gettokenID()}`,formDta);
  }
  ProfilePortifilo(formDta:any):Observable< Iprotofilo[]>
  {
   return this._httpClient.put<Iprotofilo[]>(`http://localhost:5294/api/Profile/editProtofilo/${this.gettokenID()}`,formDta);
  }
  Profile(id:any):Observable<IprofileComplete>
  {
    return this._httpClient.get<IprofileComplete>(`http://localhost:5294/api/Profile/Myprofile/${this.gettokenID()}`);
  }
  // Profilegetimage():Observable<IprofileComplete>
  // {
  //   return this._httpClient.get<IprofileComplete>(`http://localhost:5294/images/`);
  // }
  
} 