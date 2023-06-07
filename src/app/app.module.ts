import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { MaterialModule } from 'src/Material.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatComponent } from './chat/chat.component';
import { BeforeRegisterComponent } from './before-register/before-register.component';
import { DataProfileComponent } from './data-profile/data-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobesComponent } from './jobes/jobes.component';
import { ProposalsDetailsComponent } from './proposals-details/proposals-details.component';
import { ProposalsForJobComponent } from './proposals-for-job/proposals-for-job.component';
import { ClientJobsComponent } from './client-jobs/client-jobs.component';
import { SavedJobsComponent } from './saved-jobs/saved-jobs.component';
import { JobsComponent } from './jobs/jobs.component';
import { NotifyHireComponent } from './notify-hire/notify-hire.component';
import { FormuploadComponent } from './formupload/formupload.component';
import { FormuploadprotfiloComponent } from './formuploadprotfilo/formuploadprotfilo.component';
import { ProposalComponent } from './proposal/proposal.component';
import { ApplyJopComponent } from './apply-jop/apply-jop.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ChatComponent,
    BeforeRegisterComponent,
    DataProfileComponent,
    FormuploadComponent,
    FormuploadprotfiloComponent,
    SavedJobsComponent,
    JobesComponent,
    ProposalsDetailsComponent,
    ProposalsForJobComponent,
    ClientJobsComponent,
    JobsComponent,
    NotifyHireComponent,
    ProposalComponent,
    ApplyJopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
