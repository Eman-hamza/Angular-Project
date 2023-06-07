import { Component, OnInit } from '@angular/core';
import { JobsService } from '../Services/jobs.service';
import { LocationsService } from '../Services/locations.service';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import { Ilocation } from '../Interface,enum/locations';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../Services/categories.service';
import { AuthService } from '../Services/auth.service';
import { ISavedJob } from '../Interface,enum/SavedJob';
import { Ijob } from '../Interface,enum/jobs';
import { Idisplay } from '../Interface,enum/IdisoalyJob';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-jobes',
  templateUrl: './jobes.component.html',
  styleUrls: ['./jobes.component.scss']
})
export class JobesComponent implements OnInit {
  jobs:any=[];
  jobsLocation:any;
  jobsCategory:any;
  locations:any=[];
  categories:any=[];
  errorMessage:any;
  beforSelectedLocation:boolean;
  beforSelectedCategory:boolean;
  save:any;
  countSavedJobs:any=0;
  id:string="";
  savedJob:ISavedJob=new ISavedJob("",0);
  deleted:any="";
  savedJobs:any=[];

  masterSelectedLocation:boolean;
  masterSelectedCategory:boolean;
  selectedLocation:boolean;
  selectedCategory:boolean;
  checkedListLocation:any;
  checkedListCategory:any;
  color:string=""
  checkSavedJob:boolean=false;
arr:any=[]
 // clicked:boolean=false;

  

 constructor(private authService:AuthService,private jobService:JobsService,private locationService:LocationsService,private categoryService:CategoriesService, private router:Router, private activeRoute: ActivatedRoute){
  this.masterSelectedLocation = false;
  this.masterSelectedCategory=false;
  this.beforSelectedLocation=true;
  this.beforSelectedCategory=true;
  this.selectedLocation=false;
  this.selectedCategory=false;
  this.getCheckedItemListLocation();
  this.getCheckedItemListCategory();
 }

  ngOnInit(): void {
    //var heart=document.getElementById("heart"+job.id);
    //if(this.checkSavedJob==true){
      //heart!.style.backgroundColor="blue";
    //}
    console.log("init",this.arr);
    this.id=this.authService.gettokenID();
    console.log(this.id);
    this.jobService.getJobs(this.id).subscribe({
      
      next:data=>this.jobs=data,
      error:error=>this.errorMessage=error
    })

    this.jobService.getSavedJob(this.id).subscribe({
      next:data=>this.savedJobs=data,
      error:error=>this.errorMessage=error
    })
     this.jobService.getCountSavedJob(this.id).subscribe({
      next:data=>this.countSavedJobs=data,
      error:error=>this.errorMessage=error
    })  
    this.locationService.getLocations().subscribe({
      next:data=>this.locations=data,
      error:error=>this.errorMessage=error
    })
    this.categoryService.getCategories().subscribe({
      next:data=>this.categories=data,
      error:error=>this.errorMessage=error
    })

     
  
  }
  /// part Check box for Locations
  checkUncheckAllLocation() {
    for (var i = 0; i < this.locations.length; i++) {
      this.locations[i].isSelected = this.masterSelectedLocation;
    }
    this.getCheckedItemListLocation();
    this.beforSelectedLocation=true;
  }
  isAllSelectedLocation() {
    this.masterSelectedLocation = this.locations.every(function(item:any) {
        return item.isSelected == true;
      })
    this.getCheckedItemListLocation();
    this.beforSelectedLocation=false;
    
  }

  getCheckedItemListLocation(){
    this. checkedListLocation = [];
    for (var i = 0; i < this.locations.length; i++) {
      if(this.locations[i].isSelected){
      this. checkedListLocation.push(this.locations[i]);
      this.beforSelectedLocation=false;
      this.selectedLocation=true;
      }
      else if(!this.categories[i].isSelected){
        this.beforSelectedLocation=true;
      }
    }
    this.jobsLocation = [];
      for(var i=0;i<this. checkedListLocation.length;i++){
        this.jobService.getJobsLocation(this. checkedListLocation[i].id).subscribe({
          next:data=>this.jobsLocation.push(data.jobs),
          error:error=>this.errorMessage=error
      })
  }
  console.log(this. checkedListLocation)

  if(this. checkedListLocation.length==0){
    this.beforSelectedLocation=true;
  }
  console.log(" selected location: "+this.selectedLocation);
}



/// Check box for Category
checkUncheckAllCategory() {
  for (var i = 0; i < this.categories.length; i++) {
    this.categories[i].isSelected = this.masterSelectedCategory;
  }
  this.getCheckedItemListCategory();
  this.beforSelectedCategory=true;
}
isAllSelectedCategory() {
  this.masterSelectedCategory = this.categories.every(function(item:any) {
      return item.isSelected == true;
    })
  this.getCheckedItemListCategory();
  this.beforSelectedCategory=false;
}

getCheckedItemListCategory(){
  this. checkedListCategory = [];
  for (var i = 0; i < this.categories.length; i++) {
    if(this.categories[i].isSelected){
    this.checkedListCategory.push(this.categories[i]);
    this.beforSelectedCategory=false;
    this.selectedCategory=true;
    }
    else if(!this.categories[i].isSelected){
      this.beforSelectedCategory=true;
    }

  }
  this.jobsCategory = [];
    for(var i=0;i<this. checkedListCategory.length;i++){
      this.jobService.getJobsCategory(this. checkedListCategory[i].id).subscribe({
        next:data=>this.jobsCategory.push(data.jobs),
        error:error=>this.errorMessage=error
    })
}

if(this. checkedListCategory.length==0){
  this.beforSelectedCategory=true;
}
if(this.selectedCategory==true){
  this.selectedLocation=false;
}
if(this.selectedLocation==true){
  this.selectedCategory=false;
}
}
 
async SavedJob(job:any){
  var heart=document.getElementById("heart"+job.ownerOfAccountIdThatPostedThisJob+this.id);
  console.log(heart?.style.color);
   if(heart?.style.color=="rgb(64, 76, 104)")
   {
    this.arr.push(job.ownerOfAccountIdThatPostedThisJob);
    console.log(this.arr);
    this.savedJob.jobId=job.ownerOfAccountIdThatPostedThisJob;
    console.log(this.savedJob.jobId); 
    this.savedJob.userId=this.id

    await this.jobService.AddJobSaved(this.savedJob).subscribe({
      next:data=>this.save=data,
      error:error=>this.errorMessage=error
    })
    heart.style.color="rgb(21, 174, 21)";
    //this.checkSavedJob=true;
    //alert("saved")
  }
  else{
    console.log("id",job.ownerOfAccountIdThatPostedThisJob);
    //heart!.style.color="#61cc76";
     this.jobService.DeleteSavedJob(job.ownerOfAccountIdThatPostedThisJob).subscribe({
      next:data=>console.log(data),
      error:error=>this.errorMessage=error
     })
     heart!.style.color="rgb(64, 76, 104)";
     //alert("deleted");
  } 
}


NavigateToSearch(){
  this.router.navigate(["Jobs"],{relativeTo:this.activeRoute})
}
NavigateToSavedJobs(){
  this.router.navigate(["savedJobs"])
}
getTheId(job:Idisplay){
  this.router.navigate(["ApplyJob",job.ownerOfAccountIdThatPostedThisJob])
 // console.log(job.ownerOfAccountIdThatPostedThisJob);
 //this.router.navigate(['/proposals'],{state: {customerkey:job.ownerOfAccountIdThatPostedThisJob}});

}
isHourly(){
  this.jobService.getByHour().subscribe({
    next:data=>this.jobs=data,
    error:error=>this.errorMessage=error
  })
  }
  
  isFixedPrice(){
    this.jobService.getByFixedPrice().subscribe({
      next:data=>this.jobs=data,
      error:error=>this.errorMessage=error
    })
  
  }


/* click(job:any){
  var heart=document.getElementById("heart"+job.id);
  for (let job of this.jobs) {
    for (let saveddjob of this.savedJobs.savedJobs){
      if(job.id==saveddjob.jobId){
       if(heart?.style.backgroundColor=="transparent"){
       heart!.style.backgroundColor="blue";
      }
      else{
        this.checkSavedJob=false;
        heart!.style.backgroundColor="transparent";
      }
      //console.log(saveddjob);
    }
}  
}
} */
}
