import { Component, OnInit } from '@angular/core';
import { ProposalsForJobComponent } from '../proposals-for-job/proposals-for-job.component';
import { ProposalsService } from '../Services/proposals.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AnimateTimings } from '@angular/animations';

@Component({
  selector: 'app-proposals-details',
  templateUrl: './proposals-details.component.html',
  styleUrls: ['./proposals-details.component.scss']
})
export class ProposalsDetailsComponent implements OnInit{
  proposalDetails:any={}
  proposalId:any;
  jobId:any;
  constructor(private proposalService:ProposalsService,private activeRoute:ActivatedRoute,private route:Router){ }
  ngOnInit(): void {
    this.proposalId=this.activeRoute.snapshot.paramMap.get("id");
     this.proposalService.getProposalDetails(this.proposalId).subscribe({
      next:data=>{
        this.proposalDetails=data},
  
     })
  }
  navigateToProposals(jobId:any){
    console.log(jobId);
    this.route.navigate(["proposals",jobId]);
   }

}
