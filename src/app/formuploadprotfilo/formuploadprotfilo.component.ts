import { Component } from '@angular/core';
import { Iprotofilo } from '../Interface,enum/Iprotofilo';
import { ProfileService } from '../Services/profile.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-formuploadprotfilo',
  templateUrl: './formuploadprotfilo.component.html',
  styleUrls: ['./formuploadprotfilo.component.scss']
})
export class FormuploadprotfiloComponent {

  constructor(private profS:ProfileService,private toast:ToastrService,private _route:Router){}
  ProtofiloData:Iprotofilo={
    portfoliTitle:'',
    portflioDescription:'',
    portfoliolink: '',
  };
  ProtofiloUpload(){
    this.profS.ProfilePortifilo(this.ProtofiloData).subscribe({
      next: (beers) => {
        this.toast.success("Data Successuflly subimted")
        this._route.navigate(['/Profile']);
        console.log("Data Successuflly subimted")
      },
      error: (e) => {
          console.log(e )
          this.toast.error("Error")
      },
  });
  }
}
