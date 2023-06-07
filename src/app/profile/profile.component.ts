import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProfileService } from '../Services/profile.service';
import { IprofileComplete } from '../Interface,enum/IprofileComplete';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements AfterViewInit{
  constructor(private profser:ProfileService,private route:Router){}
  // Profileform:FormGroup=new FormGroup({
  //   id:new FormControl(null),
  //   name:new FormControl(null),
  //   address:new FormControl(null),
  //   title:new FormControl(null),
  //   description:new FormControl(null),
  //   workHistory:new FormControl(null),
  //   fixedSalary:new FormControl(null),
  //   freelancer:new FormControl(null),
  //   client:new FormControl(null),
  //   portfoliTitle:new FormControl(null),
  //   portflioDescription:new FormControl(null),
  //   portfoliolink:new FormControl(null),
  //   education:new FormControl(null),
  //   languge:new FormControl(null),
  //   skill:new FormControl(null),
  // });
  profileData:IprofileComplete={
    id: this.gettokenID(),
    name: "",
    address:"",
    title: '',
    description: '',
    workHistory: '',
    fixedSalary: 0,
    freelancer: false,
    client:false,
    portfoliTitle: '',
    profileImage:'',
    portflioDescription:'',
    portfoliolink:'',
    aUser:null,
    jobs: null,
    education: [
      {
        id: '',
        titleEdu:'',
        from:new Date("2023-04-26T14:42:36.338Z"),
        to:new Date("2023-04-26T14:42:36.338Z"),
        profileId:'',
        profile: null
      }
    ],
    skill: [
      {
        id:0,
        nameskill: '',
        profileId: '',
        profile: null
      }
    ],
    languge: [
      {
        id:0,
        namelanguge: '',
        profileId: '',
        profile:null
      }
    ]
  }
// linprofile:string="http://localhost:5294/images/w.png";
  // ngOnInit(): void {
  //   this.profser.Profile(this.profileData.id).subscribe((response)=>{
  //     this.profileData=response;
  //     console.log(response);
  //   })
    ngAfterViewInit(): void {
      this.profser.Profile(this.profileData.id).subscribe((response)=>{
        this.profileData=response;
        console.log(response);
    })
    // console.log(this.profileImage);
    console.log("---------------------------------------");

    // this.profser.Profilegetimage().subscribe({
    //   next:data=>this.profileImage=data
    // });
  }
  currentuser:any;
  gettokenID(): string {
    let token: any = localStorage.getItem("userInfo");
    this.currentuser = jwtDecode(token);
    var nameIdentifier = this.currentuser['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];  
    // if(nameIdentifier['http://schemas.xmlsoap.org/ws/2008/06/identity/claims/role']=='Freelancer')

    console.log(nameIdentifier);
    return nameIdentifier;
  } 
  gotochange(){
    
    this.route.navigate(['/uploading'])
  }
  gotoedit(){
    this.route.navigate(['/uploadingProtofilo'])
  }
}
