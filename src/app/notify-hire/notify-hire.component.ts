
import { Component, OnInit } from '@angular/core';
import { HireFreelancerService } from '../Services/hire-freelancer.service';
import { AuthService } from '../Services/auth.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-notify-hire',
  templateUrl: './notify-hire.component.html',
  styleUrls: ['./notify-hire.component.scss']
})
export class NotifyHireComponent implements OnInit  {
  hireJobs:any=[]
  tokenId:string=""
  constructor(private hireService:HireFreelancerService,private auth:AuthService){}
ngOnInit(): void {
  this.tokenId=this.gettokenID();
  this.hireService.getAllHireJobs(this.tokenId).subscribe({
    next:data=>this.hireJobs=data
  })
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
}

