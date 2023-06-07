import { Component, OnInit } from '@angular/core';
import { JopServiceService } from '../Services/jop-service.service';
import { IJob, Proposal, ProposalDTO, IProposalPost } from '../Interface,enum/IJob';
import { Inject } from '@angular/core';
import { inject } from '@angular/core/testing';
import { ProposalService } from '../Services/proposal.service';
import { HttpClient } from '@angular/common/http';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

import { FormsModule } from '@angular/forms'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
//import { time } from 'console';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.css']
})


export class ProposalComponent implements OnInit {

  Jobs!: IJob
  postData!: ProposalDTO
  Proposals!: Proposal
  BidRecevied!: number
  JobID: any

  PostProposal: ProposalDTO = {
    coverLetter: "",
    proposedPrice: 0,
    jobId: 0,
    userId: this.gettokenID()
  }


  constructor(private activeRoute: ActivatedRoute, private _postService: ProposalService, private _porp: ProposalService, private _jop: JopServiceService, private builder: FormBuilder,private toast:ToastrService,private route:Router) {

    //
    // _porp.getJop(this.Jobs).subscribe(
    //   {
    //     next: data => {
    //       this.BidRecevied = (data.budget * 90) / 100;
    //       this.PostProposal.JobId = 3
    //       console.log(data);
    //     }
    //   }
    // );

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

  Dataform = this.builder.group({
    // CoverLetter:new FormControl(null,[Validators.required]),
    // ProposedPrice:new FormControl(null,[Validators.required])
    CoverLetter: (''),
    ProposedPrice: ('')
  });
  ngOnInit(): void {

    this.activeRoute.paramMap.subscribe((pram: ParamMap) => {
      this.JobID = pram.get("id");

      this._porp.getJop(this.JobID).subscribe({
        next: data => {
          this.Jobs = data,
            this.PostProposal.jobId = this.JobID
            ,
            this.BidRecevied = (this.PostProposal.proposedPrice * 90) / 100,
            console.log(data),
            this.JobID = this.Jobs.id
        },

        error: err => console.log(err),


      })
    })

    // this._porp.getJop().subscribe(
    //   {
    //     next: data => {
    //       this.BidRecevied = (this.PostProposal.ProposedPrice * 10) / 100;
    //       this.PostProposal.JobId = data.id
    //       console.log(data);
    //     }
    //   })

  }

  sendData() {
    // console.log(item.value);
    console.log("-----------------------response-------------------")
    this.PostProposal.jobId = this.JobID
    console.log(this.PostProposal)
    this._postService.addProposal(this.PostProposal).subscribe({
      // next: data => console.log(data),
      next: (beers) => {

        console.log("Data Successuflly subimted")
      },
      error: (err )=>{
      this.toast.success("Proposal Add Successuflly")
      this.route.navigate(['/Jobs']);
      }
    })

  }


}
