import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MSAL_GUARD_CONFIG, MsalGuardConfiguration, MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AzureAdServiceService } from './azure-ad-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  title = 'angular-poc';

  isUserLoggedIn:boolean=false;

  private readonly _destroy=new Subject<void>();

  constructor(@Inject(MSAL_GUARD_CONFIG)
  private msalGuardConfig:MsalGuardConfiguration,
  private msalBroadCastService: MsalBroadcastService,
  private authService:MsalService,
  private azureAdService: AzureAdServiceService){

  }


  ngOnInit(): void {
    this.msalBroadCastService.inProgress$.pipe
    (filter((interactionStatus:InteractionStatus)=>
    interactionStatus==InteractionStatus.None),
    takeUntil(this._destroy))
    .subscribe(x=>{
      this. isUserLoggedIn=this. authService. instance. getAllAccounts().length>0
      this.azureAdService.isUserLoggedIn.next(this.isUserLoggedIn);
    })
    }

    ngOnDestroy(): void {
     this._destroy.next(undefined);
     this._destroy.complete();
    }

    login(){
      if(this.msalGuardConfig.authRequest)
       {
        this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest)
      }
      else
      {
        this.authService.loginRedirect();
      }
    }

    logout(){
      this.authService.logoutRedirect({postLogoutRedirectUri:environment.postLogout});
    }
}





