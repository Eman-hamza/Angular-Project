import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './Services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class FreelancerGuard implements CanActivate {
  constructor(private kero:AuthService)
  {

  }
  canActivate()
  {
      if(this.kero.gettokenRole()=="freelancer"){
        return true;
      }
      else{
        return false;
      }
    }
  }
  
  

