import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Job } from '../Interface,enum/Job';
import { AuthService } from '../Services/auth.service';
import { JobServiceService } from '../Services/job-service.service';
import { CategoriesService } from '../Services/categories.service';
import { LocationsService } from '../Services/locations.service';
@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit{
  errors:string='';
  public loginInvalid = false;
 pr:string="";


 
ngOnInit(): void {
  this.category.getCategories().subscribe({
    next:data=>this.ObjCategory=data
  })
  this.location.getLocations().subscribe({
    next:data=>this.ObjLocation=data
  })
  this.pr=this.gettokenID();
 

}
  constructor(public location:LocationsService ,public category:CategoriesService,private Auth:AuthService,public JobService:JobServiceService,public _route:Router,private toast:ToastrService){}
  Jobform:FormGroup=new FormGroup({
    // username:new FormControl(null),
    Title:new FormControl(null,[Validators.required]),
    Budget:new FormControl(null,[Validators.required]),
    Description:new FormControl(null,[Validators.required]),
    numberOfConnects:new FormControl(null,[Validators.required]),
    ProfileId:new FormControl(this.gettokenID()),
    CategoryId:new FormControl(null,[Validators.required]),
    LocationId:new FormControl(null,[Validators.required]),
    
   
  });

  jobmodel:Job={
    Title : "",
    Budget : "",
    Description : "",
    numberOfConnects:0,
    ProfileId :this.gettokenID(),
    LocationId:0,
    CategoryId:0,
    isHourly:false
 
  }
  ObjCategory:any[]=[]
  ObjLocation:any[]=[]

  addJobs(Jobform:FormGroup){
    
    
   
    console.log(Jobform.value);
   

    console.log(this.jobmodel.ProfileId);
      this.JobService.AddJob(this.jobmodel).subscribe({
        next: (beers) => {
          this.toast.success("Job Added Successuflly :) ")
          this._route.navigate(['/Home']);
          console.log("Data Successuflly subimted")
        },
        error: (e) => {
            console.log(e )
            this.toast.error("You Should Complete Your Data , Please :( ")
        }
        // if(response.message!="NotValid"){
        //   this.toast.success("Job is added successfully!! ")
         
          
        //   console.log(response.token);
        //   //  localStorage.setItem('userInfo',response.token)
        //   // this.JobService.saveData();
        //   this._route.navigate(['/Home'])
          
        // }
                // else { 
        //   this.toast.error("The username or password were not recognised")
        //     this.loginInvalid = true;
        //     this._route.navigate(['/Login']) 
        // }
        // next: (beers) => {
        //   this.toast.success("Job is added successfully!! ")
       
        //   console.log(beers.token);
        //    localStorage.setItem('userInfo',beers.token)
        //   this.JobService.saveData();
        //   this._route.navigate(['/Home'])
        // },
        // error: (e) => {
        //   this.toast.error("If you are a new customer, go first to make Profile")
        //     // this.loginInvalid = true;
        //     // this._route.navigate(['/DataProfile']) 
        // },
      })
      // window.alert("Job is added successfully!!");
      
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
    changeValueCategory(cat:any){
      console.log(cat.value);
    }
    changeValueLocation(cat:any){
      console.log(cat.value);
    }
 
  }