import { Component, OnInit } from '@angular/core';
import { CompetitionService } from './services/competition.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() { }
  title = 'football-app';
}
