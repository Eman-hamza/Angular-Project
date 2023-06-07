import { Component } from '@angular/core';
import { JobsService } from '../Services/jobs.service';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-client-jobs',
  templateUrl: './client-jobs.component.html',
  styleUrls: ['./client-jobs.component.scss']
})
export class ClientJobsComponent {
  Jobs:any=[];
  currentUserId:any;
  errorMessage:any;
  constructor(private auth:AuthService,private jobsService:JobsService,private route:Router){}
  ngOnInit(): void {
    this.currentUserId=this.gettokenID();
    this.jobsService.getClientJobs(this.currentUserId).subscribe({
      next:data=>this.Jobs=data,
      error:error=>this.errorMessage=error
    })
  }
  NavigateToProposals(job:any){
    this.route.navigate(["proposals",job.id]);
  }
  currentuser:any;

  gettokenID(): string {
    let token: any = localStorage.getItem("userInfo");
    this.currentUserId = jwtDecode(token);
    console.log(this.currentUserId);
    var nameIdentifier = this.currentUserId['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    console.log(nameIdentifier);
    return nameIdentifier;
  } 
  gettokenRole(): string {
    let token: any = localStorage.getItem("userInfo");
    this.currentUserId = jwtDecode(token);
    var nameIdentifier = this.currentUserId['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    return nameIdentifier;
  } 
}
