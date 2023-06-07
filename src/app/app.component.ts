import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Freelancer';
  // showHeader=true;
  // constructor(private route:Router){
  //   route.events.subscribe((val)=>{
  //     if(val instanceof NavigationEnd){
  //       if(val.url=='/Login'|| val.url=='/Register')
  //       {
  //         this.showHeader=false;
  //       }
  //       else
  //       {
  //         this.showHeader=true;
  //       }
  //     }
  //   })}
}
