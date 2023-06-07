import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from '../Services/profile.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Iprofile } from '../Interface,enum/Iprofile';
import { Title } from '@angular/platform-browser';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { BeforeRegisterComponent } from '../before-register/before-register.component';
import { DatatransferService } from '../Services/datatransfer.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  // template:`<app-before-register style="display:none;"  (nameProPass)="funcf($event)"></app-before-register>
  // <h1>{{marwa}} </h1>`,
  selector: 'app-data-profile',
  templateUrl: './data-profile.component.html',
  styleUrls: ['./data-profile.component.scss']
})
export class DataProfileComponent implements OnInit{
  constructor(public profSer:ProfileService,private datat:DatatransferService,private auth:AuthService,private toast:ToastrService,public _route:Router,private builder:FormBuilder){}
    
  Dataform=this.builder.group({
      id:this.gettokenID(),
      name:new FormControl(null,[Validators.required]),
      description:new FormControl(null,[Validators.required]),
      workHistory:new FormControl(null,[Validators.required]),
      address:new FormControl(null,[Validators.required]),
      fixedSalary:new FormControl(null,[Validators.required]),
      title:new FormControl(null,[Validators.required]),
      titleEdu:new FormControl(null,[Validators.required]),
      from: new FormControl(null,[Validators.required]),
      to: new FormControl(null,[Validators.required]),
      // nameskill:this.builder.array([this.builder.control('')]),
      // profileId:this.gettokenID(),
      nameskill:new FormArray([]),
      namelanguge:new FormArray([]),
    // altrenativeskill:this.builder.array([])
  });
  CurrentID=new BehaviorSubject(null);

// ********************************

get skill(){
  return (<FormArray>this.Dataform.get("nameskill")).controls;
}
addall(){
  const control=new FormControl(null,[Validators.required]);

  (<FormArray>this.Dataform.get('nameskill')).push(control);
 
}

get languge(){
  return (<FormArray>this.Dataform.get("namelanguge")).controls;
}
addlan(){
  const control=new FormControl(null,[Validators.required]);

  (<FormArray>this.Dataform.get('namelanguge')).push(control);
 
}

// FormData=[{
//   profileId: this.gettokenID(),
//  nameskill:(<FormArray>this.Dataform.get('nameskill'))
// }
// ]
// addinDb(){ 
//    console.log(this.FormData)
//    console.log((<FormArray>this.Dataform.get('nameskill')).value)

//     this.profSer.ProfileSkill(this.FormData).subscribe({
//     next: (beers) => {
//       this.toast.success("Data Successuflly subimted")
//     },
//     error: (e) => {
//         console.log("Data  Error")
//         this.toast.error("add error")
//     },
// });
// }
// *************************************
    // @Input() item:any;
    //   nameC:any;
    //   nameF:any;
    //   marwa:string='';
    //@ViewChild(BeforeRegisterComponent) child!: BeforeRegisterComponent;


  ProfileList:Iprofile={
    id: this.gettokenID(),name:'Eman Hamza',address:'Assiut',title:"Full Stack Development",description:"I’m a developer with experience in building websites for small and medium sized businesses",
    workHistory:"Programmer",fixedSalary:0,client:false,freelancer:false,
    eductionDTO:
      [{
        titleEdu:"Assiut university",
        from:new Date("2023-04-26T14:42:36.338Z"),
        to:new Date("2023-04-26T14:42:36.338Z")
      }],
      skillsDTOs: [
        {
          profileId:this.gettokenID(),
          nameskill:(<any>this.Dataform.get('nameskill'))
        }
      ],
      langugeDTOs: [
        {
          namelanguge: (<any>this.Dataform.get('namelanguge'))
        }
      ]
    };
  errormessage:any;
  currentuser:any;

  
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
}
  SubmitProfile(){
    // this.funcf();
    
    const jsonData: string = JSON.stringify(this.Dataform.value)
    
    console.log(jsonData)
    this.profSer.ProfSubmit(jsonData,this.httpOptions).subscribe({
      next: (beers) => {
        this.toast.success("Data Successuflly subimted")
        this._route.navigate(['/uploading']);
        console.log("Data Successuflly subimted")
      },
      error: (e) => {
          console.log(e )
          this.toast.error("You Have A profile, if you want to edit go to Profile")
      },
  });
  console.log(this.ProfileList);
  } 
  // funcf($event:any){
  //   this.marwa=$event;
    // if(this.nameC=='client'){
    // this.ProfileList.freelancer=false 
    // this.ProfileList.client=true;
    // }
    // else if (this.nameC=='freelancer'){
    //  this.ProfileList.freelancer=true;
    //  this.ProfileList.client=false;
    // } 
    // else if(this.nameF=='client'){
    //   this.ProfileList.freelancer=false 
    //   this.ProfileList.client=true;
    //   }
    // else if (this.nameF=='freelancer'){
    //    this.ProfileList.freelancer=true;
    //    this.ProfileList.client=false;
    //   } 
  // }
ngOnInit(): void {
  // this.datat.user.subscribe(data=>{
  //   this.nameF = data;
  //console.log("hiiiiiiii in profile");
  
  // });
}
  gettokenID(): string {
    let token: any = localStorage.getItem("userInfo");
    this.currentuser = jwtDecode(token);
    var nameIdentifier = this.currentuser['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    //this.CurrentID=nameIdentifier;
    console.log(nameIdentifier);
    return nameIdentifier;
  } 
}

