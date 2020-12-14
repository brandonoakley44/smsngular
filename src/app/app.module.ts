import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

//import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SecureModule } from './secure/secure.module';
import { PublicModule } from './public/public.module';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';

import { GoogleLoginProvider } from 'angularx-social-login';
import { AuthGuard } from './auth.guard';
import { SecureInnerPagesGuard } from './secure-inner-pages.guard';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SecureModule,
    PublicModule,
    SocialLoginModule,
    HttpClientModule,

  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '803093524174-9orbsrad9khhmm856s31h80fjq5vlasi.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig
    },
    AuthGuard, SecureInnerPagesGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
