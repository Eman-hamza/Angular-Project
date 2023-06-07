import { Component, OnInit } from '@angular/core';
import { JopServiceService } from '../Services/jop-service.service';
import { IJob, IProposalPost } from '../Interface,enum/IJob';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-apply-jop',
  templateUrl: './apply-jop.component.html',
  styleUrls: ['./apply-jop.component.css']
})
export class ApplyJopComponent implements OnInit {

  Jobs: any
  JobID: any
  userID: any

  constructor(private _jop: JopServiceService, private activeroute: ActivatedRoute, private route: Router) {
    _jop.Getjob(this.JobID).subscribe(
      {
        next: data => {
          this.Jobs = data,
            console.log(this.Jobs),
            console.log(data)
        }
      }
    );

    this.activeroute.paramMap.subscribe((pram: ParamMap) => {
      this.JobID = pram.get("id");
      this._jop.Getjob(this.JobID).subscribe({
        next: data => { this.Jobs = data, console.log(data) },

        error: err => console.log(err),


      })

    })
  }

  ngOnInit(): void {
    this.activeroute.snapshot.paramMap.get("id");
  }

  SaveJop(): void {
    this.Jobs.isSaved = true;
  }
  navigateToApplyJob() {
    this.route.navigate(["proposal", this.JobID]);
  }



  // currentuser:any;
  // gettokenID(): string {
  //   let token: any = localStorage.getItem("userInfo");
  //   this.currentuser = jwtDecode(token);
  //   console.log(this.currentuser);
  //   var nameIdentifier = this.currentuser['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
  //   console.log(nameIdentifier);
  //   return nameIdentifier;
  // } 
  // gettokenRole(): string {
  //   let token: any = localStorage.getItem("userInfo");
  //   this.currentuser = jwtDecode(token);
  //   var nameIdentifier = this.currentuser['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  //   return nameIdentifier;
  // } 

}
