import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CompetitionService } from './services/competition.service';
import { ApiInterceptor } from './api.interceptor';
import { CompetitionPageComponent } from './components/competition-page/competition-page.component';
import { MatchPageComponent } from './components/match-page/match-page.component';
import { MatchContainerComponent } from './components/match-container/match-container.component';
import { MatchInContainerComponent } from './components/match-in-container/match-in-container.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CompetitionPageComponent,
    MatchPageComponent,
    MatchContainerComponent,
    MatchInContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
      CompetitionService,
      DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
