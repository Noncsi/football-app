import { Component, OnInit } from '@angular/core';

import { CompetitionService } from 'src/app/services/competition.service';
import { Competition } from 'src/app/models/competition';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  competitions: Competition[];

  constructor(private competitionService: CompetitionService) { }

  ngOnInit() {
    this.competitionService.competitionSubject.subscribe(comps => {
      this.competitions = comps;
      this.competitions.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
    });
  }
}
