import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProfileService } from '../Services/profile.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Iprofile } from '../Interface,enum/Iprofile';
import { DataProfileComponent } from '../data-profile/data-profile.component';
import { outputAst } from '@angular/compiler';
import { DatatransferService } from '../Services/datatransfer.service';
import { RegisterComponent } from '../register/register.component';
import { FreelancerValueService } from '../Services/freelancer-value.service';
@Component({
  selector: 'app-before-register',
  templateUrl: './before-register.component.html',
  styleUrls: ['./before-register.component.scss']
})
export class BeforeRegisterComponent implements OnInit {
  constructor(public freelancer:FreelancerValueService,public profs:ProfileService,private datat:DatatransferService,public _route:Router,private toast:ToastrService,private builder:FormBuilder){}

  dataform=this.builder.group({
    freelancer:new FormControl(null),
    client:new FormControl(null),
});

namePro:any;
// if(namePro='feelancer'){
//   namePro=true;
// }

//to pass data to profileData component 
@Output() nameProP = new EventEmitter <string>();

par():string{
  return this.namePro;

}

setUser(){
  console.log(this.namePro);
  this.nameProP.emit(this.namePro)
}

// ******************************************
ngOnInit(): void {  
}

clientRole(){
  this.freelancer.isFreelacer=false;
  // this.freelanceGuard=false;
  console.log( this.freelancer.isFreelacer)

}
freeRole(){
  this.freelancer.isFreelacer=true;
console.log( this.freelancer.isFreelacer)
}


chooseCF(dataform:FormGroup){
      this.toast.success("choose complete :) ")
      this._route.navigate(['/Register']);

  // console.log(dataform);
  // this.profs.chooseuser(dataform.value).subscribe((info)=>{
  //   if (info.message=="success") {
  //     this.toast.success("choose complete :) ")
  //     this._route.navigate(['/Register']);
  //     console.log(" Successuflly Register")
  //   }
  //   else if(info.message=="NotVaild"){
  //     this.toast.error("Notchoose")
  //   }
  // })
  }
  // *********************************************************
  // changeUser() {
  //   this.datat.changeUser(this.namePro);
  // }
}