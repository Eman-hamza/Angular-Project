import { Component, OnInit } from '@angular/core';
import { ProposalsService } from '../Services/proposals.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProposal } from '../Interface,enum/proposals';
import { HireFreelancerService } from '../Services/hire-freelancer.service';
import { Ihire } from '../Interface,enum/HireFreelancer';
import { AuthService } from '../Services/auth.service';
import jwtDecode from 'jwt-decode';
import { IprofileComplete } from '../Interface,enum/IprofileComplete';
import { ProfileService } from '../Services/profile.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-proposals-for-job',
  templateUrl: './proposals-for-job.component.html',
  styleUrls: ['./proposals-for-job.component.scss']
})
export class ProposalsForJobComponent implements OnInit {
  constructor(private proSer: ProfileService, private proposalsService: ProposalsService, private activeRoute: ActivatedRoute, private route: Router, private hireService: HireFreelancerService, private authservice: AuthService,private toast:ToastrService) { }
  /*  currentuser:any;
   gettokenID(): string {
     let token: any = localStorage.getItem("userInfo");
     this.currentuser = jwtDecode(token);
     console.log(this.currentuser);
     var nameIdentifier = this.currentuser['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
     console.log(nameIdentifier);
     return nameIdentifier;
   } */
  jobId: any;
  proposals!: IProposal[];
  errormessage: any;
  // profileData: IprofileComplete = {
  //   id: this.gettokenID(),
  //   name: "",
  //   address: "",
  //   title: '',
  //   description: '',
  //   workHistory: '',
  //   fixedSalary: 0,
  //   freelancer: false,
  //   client: false,
  //   portfoliTitle: '',
  //   profileImage: '',
  //   portflioDescription: '',
  //   portfoliolink: '',
  //   aUser: null,
  //   jobs: null,
  //   education: [
  //     {
  //       id: '',
  //       titleEdu: '',
  //       from: new Date("2023-04-26T14:42:36.338Z"),
  //       to: new Date("2023-04-26T14:42:36.338Z"),
  //       profileId: '',
  //       profile: null
  //     }
  //   ],
  //   skill: [
  //     {
  //       id: 0,
  //       nameskill: '',
  //       profileId: '',
  //       profile: null
  //     }
  //   ],
  //   languge: [
  //     {
  //       id: 0,
  //       namelanguge: '',
  //       profileId: '',
  //       profile: null
  //     }
  //   ]
  // }

  ngOnInit(): void {
    this.jobId = this.activeRoute.snapshot.paramMap.get("id");
    console.log(this.jobId);
    this.proposalsService.getProposalsByJob(this.jobId).subscribe({
      next: data => {
        this.proposals = data;
        console.log(this.proposals);

      },
      error: error => this.errormessage = error
    })

  }
  hired: Ihire = { clientId: "", proposalId: 0, createAt: new Date() }
  HireFreelancer(proposal: IProposal) {
    this.hired = { clientId: this.gettokenID(), proposalId: proposal.id, createAt: new Date() }
    console.log(this.hired);

    this.hireService.AddHireFreelancer(this.hired).subscribe()
      this.toast.success("Hired Done :) ");
  }
  navigateToclientJobs() {
    this.route.navigate(["clientJobs"]);
  }
  NavigateToProposalsDetails(proposal: any) {
    this.route.navigate(["proposalsDetails", proposal.id]);
  }
  currentuser: any;
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
