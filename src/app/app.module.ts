import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { AzureAdServiceService } from './azure-ad-service.service';


const isIE = (window.navigator.userAgent.indexOf('MSIE') > -1) || (window.navigator.userAgent.indexOf('Trident/') > -1);

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MsalModule.forRoot(new PublicClientApplication
      (
        {
          auth:{
            clientId:'7cccc6c4-8bbf-4aba-9381-081ea91a713c',
            redirectUri:'http://localhost:4200',
            authority:'https://login.microsoftonline.com/698def9f-1253-4a01-be82-b9d2e87e320b'
          },
          cache:{
            cacheLocation: 'localStorage',
            storeAuthStateInCookie:isIE
          }
        }
      ),
      {
        interactionType:InteractionType.Redirect,
        authRequest:{
          scopes:['user.read']
        }
      },
      {
      interactionType:InteractionType.Redirect,
      protectedResourceMap:new Map(
        [
          ['https://graph.microsoft.com/v1.0/me',['user.read']]
        ]
      )
    }
      )
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:MsalInterceptor,
      multi:true
    },MsalGuard,AzureAdServiceService],
  bootstrap: [AppComponent,MsalRedirectComponent]
})
export class AppModule { }
