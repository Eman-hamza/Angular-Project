import { Component, OnInit } from '@angular/core';
import { JobsService } from '../Services/jobs.service';
import { Route, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.component.html',
  styleUrls: ['./saved-jobs.component.scss']
})
export class SavedJobsComponent implements OnInit {
  SavedJobs:any=[];
  errorMessage:any;
  id:string=""
  constructor(private jobsService:JobsService,private route:Router,private auth:AuthService){}
  ngOnInit(): void {
    this.id=this.gettokenID();
    console.log(this.id);
   this.jobsService.getSavedJob(this.id).subscribe({
      next:data=>this.SavedJobs=data,
      error:error=>this.errorMessage=error
    })
  }
  navigateToHome(){
   this.route.navigate(["Jobs"]);
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
