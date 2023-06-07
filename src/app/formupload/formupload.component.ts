import { Component } from '@angular/core';
import { ProfileService } from '../Services/profile.service';
import jwtDecode from 'jwt-decode';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-formupload',
  templateUrl: './formupload.component.html',
  styleUrls: ['./formupload.component.scss']
})
export class FormuploadComponent {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _Prof:ProfileService,
    private toast:ToastrService 
  ) { }
  file!:File;
  // ngOnInit(): void {
  //   this.buildForm();
  // }

  // buildForm(): void {
  //   this.formData = this.formBuilder.group(
  //     {
  //       id:this.gettokenID(),
  //       image: [""]
  //     },
  //   );
  // }



  // get f() {
  //   return this.formData.controls;
  // }
  // profileImage:string='';
  image:any;
  allowedExtensions:any;
  onFileSelected(event: any) {
    
     this.file = event.target.files[0];
    // this.allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    // const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer();
    // dataTransfer.items.add(new File(['my-file'], 'new-file-name'));
    // const inputElement: HTMLInputElement = document.getElementById('formFile') as HTMLInputElement

    // event.profileImage = dataTransfer.files;
  }
  currentuser:any;
  gettokenID(): string {
    let token: any = localStorage.getItem("userInfo");
    this.currentuser = jwtDecode(token);
    var nameIdentifier = this.currentuser['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    //this.CurrentID=nameIdentifier;
    console.log(nameIdentifier);
    return nameIdentifier;
  } 
   onUpload(){
    const Formdata:FormData=new FormData();
    Formdata.append('id',this.gettokenID())
    Formdata.append('file',this.file,this.file.name)

    // console.log(Formdata);

     this._Prof.ProfileImage(Formdata).subscribe((info)=>{
       if (info.message=="success") {
         this.toast.success("Successuflly upload image")
         this.file=info.toString();
         this.router.navigate(['/uploadingProtofilo']);
        //  [routerLink]="['/uploadingProtofilo']"
         console.log(" Successuflly Register")
       }
       else if(info.message=="NotVaild"){
         this.toast.error("Error Upload Image")
       } 
     })
  }
  // onSubmit(formData: FormGroup) {
  //   if (this.formData.invalid) {
  //     window.scroll({
  //       top: 0,
  //       left: 0,
  //       behavior: "smooth",
  //     });
  //     console.log(this.registerForm)
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("id", this.gettokenID());

  //   if (this.selectedFile) {
  //     formData.append("image", this.selectedFile, this.selectedFile.name);
  //   }
  //   this._Prof.ProfileImage(formData).subscribe({
  //       next: (beers) => {
  //         this.toast.success("Data Successuflly subimted")
  //         this.router.navigate(['/Profile']);
  //         console.log("Data Successuflly subimted")
  //       },
  //       error: (e) => {
  //           console.log(e )
  //           this.toast.error("You Have A profile, if you want to edit go to Profile")
  //       },
  //   });
  // }

}
