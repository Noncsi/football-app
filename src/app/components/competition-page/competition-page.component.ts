import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { CompetitionService } from 'src/app/services/competition.service';
import { Match } from 'src/app/models/match';
import { Competition } from 'src/app/models/competition';
import { MatchStatus } from 'src/app/models/matchStatus';

@Component({
  selector: 'app-competition-page',
  templateUrl: './competition-page.component.html',
  styleUrls: ['./competition-page.component.scss']
})
export class CompetitionPageComponent implements OnInit {

  liveMatches: Match[];
  scheduledMatches: Match[];
  selectedCompetition: Competition;

  MatchStatus = MatchStatus;

  constructor(private competitionService: CompetitionService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.competitionService.competitionSubject.subscribe(comps => {
      this.getSelectedCompetitionId(comps);
      this.getMatches(this.selectedCompetition)
    });

  }

  getMatches(selectedCompetition: Competition) {
    this.competitionService.getMatches(selectedCompetition.id, MatchStatus.live).subscribe((matchParent) => {
      this.liveMatches = matchParent.matches;
    })
    this.competitionService.getMatches(selectedCompetition.id, MatchStatus.scheduled).subscribe((matchParent) => {
      this.scheduledMatches = matchParent.matches;
    })
  }

  getSelectedCompetitionId(competitions: Competition[]) {
    this.route.paramMap.subscribe(params => {
      this.selectedCompetition = competitions.filter(c => c.name == params.get("name"))[0];
    })
  }
}
