import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent } from './components/main-page/main-page.component';
import { CompetitionPageComponent } from './components/competition-page/competition-page.component';
import { MatchPageComponent } from './components/match-page/match-page.component';


const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: ':name', component: CompetitionPageComponent },
  { path: ':name/:id', component: MatchPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
