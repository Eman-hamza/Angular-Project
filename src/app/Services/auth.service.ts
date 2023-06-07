import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient:HttpClient,private route:Router) { 
    if(localStorage.getItem('userInfo')!=null){
      this.saveData();
    }
  }
  userdata= new BehaviorSubject(null);
  saveData(){
    let encodeData=JSON.stringify(localStorage.getItem('userInfo'));
    this.userdata.next(jwtDecode(encodeData));
    // console.log(this.userdata);
    return (this.userdata)
  }

  logout(){
    localStorage.removeItem('userInfo')
    this.userdata.next(null);
    this.route.navigate(['/Login']);

  }
  Register( formDta:any):Observable<any>
  {
   return this._httpClient.post("http://localhost:5294/api/Account/Regitser",formDta)
  }
  Login( formDta:any):Observable<any>
  {
   return this._httpClient.post("http://localhost:5294/api/Account/Login",formDta)
  }
  currentuser:any;
  gettokenID(): string {
    let token: any = localStorage.getItem("userInfo");
    this.currentuser = jwtDecode(token);
    console.log(this.currentuser);
    var nameIdentifier = this.currentuser['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    console.log(nameIdentifier);
    return nameIdentifier;
  } 
  gettokenRole(): string {
    let token: any = localStorage.getItem("userInfo");
    this.currentuser = jwtDecode(token);
    var nameIdentifier = this.currentuser['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    return nameIdentifier;
  } 
  // getId(): string {
  //   let token: any = localStorage.getItem("userInfo");
  //   this.currentuser = jwtDecode(token);
  //   var nameIdentifier = this.currentuser['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
  //   return nameIdentifier;

  // }

//   canActivate(){
//     let token: any = localStorage.getItem("userInfo");
//        if (token && !this.jwtHelper.isTokenExpired(token)) {
//         const decodtokn=this.jwtHelper.decodeToken(token);
//     // this.currentuser = jwtDecode(token);
//    if(decodtokn['http://schemas.xmlsoap.org/ws/2008/06/identity/claims/role']=='Freelancer')
//     return true;
//   }
  
//   return false;
// }
}
