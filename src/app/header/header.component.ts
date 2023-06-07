import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import jwtDecode from 'jwt-decode';
import { BeforeRegisterComponent } from '../before-register/before-register.component';
import { FreelancerValueService } from '../Services/freelancer-value.service';
import { FreelancerGuard } from '../freelancer.guard';
// import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  isLogin:boolean=false;
  isfree:boolean=false;

  // public jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private free:FreelancerGuard,private auth:AuthService,private toast:ToastrService,private isFreelance:FreelancerValueService){}//,private jwtHelper:JwtHelperService){}
   
  ngOnInit(): void {
    this.auth.userdata.subscribe(()=>{
      if(this.auth.userdata.getValue()!=null){
        this.isLogin=true;
      }
      else{
        this.isLogin=false;
      }

      if(this.free.canActivate()){
          this.isfree=true;
        }
        else{
          this.isfree=false;
        }
      // if(this.isFreelance.isFreelacer)
      // {
      //   this.isfreelancer=false;
      // }
      // else{
      //   this.isfreelancer=true;

      // }
    })  

  }

  logOut(){
    this.auth.logout();
  }

  message(){
    this.toast.info("If you want to create Profile go to Create Profile, If not ... continue :) ")
  }
  // currentuser:any;
  // gettokenID(): string {
  //   let token: any = localStorage.getItem("userInfo");
  //   this.currentuser = jwtDecode(token);
  //   var nameIdentifier = this.currentuser['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];  
  //   if(nameIdentifier['http://schemas.xmlsoap.org/ws/2008/06/identity/claims/role']=='Freelancer')
  //   {
  //     this.isLog=true;
  //   }
  //   else{
  //     this.isLog=false;
  //   }
  //   return nameIdentifier;
  // } 
  // isUserAuthenticated() {
  //   const token = localStorage.getItem("userInfo");
  //   if (token && !this.jwtHelper.isTokenExpired(token)&&this.isFreelance.isFreelacer) {
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }

}
