import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { CompetitionService } from 'src/app/services/competition.service';

@Component({
  selector: 'app-competition-page',
  templateUrl: './competition-page.component.html',
  styleUrls: ['./competition-page.component.scss']
})
export class CompetitionPageComponent implements OnInit {

  liveMatches: Match[];
  scheduledMatches: Match[];
  selectedCompetition: Competition;

  constructor(private competitionService: CompetitionService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.competitionService.competitionSubject.subscribe(comps => {
      this.getSelectedCompetitionId(comps);
      this.getMatches(this.selectedCompetition)
    });
  }

  getMatches(selectedCompetition: Competition) {
    this.competitionService.getMatches(selectedCompetition.id, matchStatus.live).subscribe((matchesFromApi) => {
      this.liveMatches = matchesFromApi['matches'];
    })
    this.competitionService.getMatches(selectedCompetition.id, matchStatus.scheduled).subscribe((matchesFromApi) => {
      this.scheduledMatches = matchesFromApi['matches'];
    })
  }

  getSelectedCompetitionId(comps: Competition[]) {
    this.route.paramMap.subscribe(params => {
      this.selectedCompetition = comps.filter(c => c.name == params.get("name"))[0];
      this.competitionService.selectedCompetitionSubject.next(this.selectedCompetition);
    })
  }
}
