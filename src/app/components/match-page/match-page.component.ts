import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { CompetitionService } from 'src/app/services/competition.service';

@Component({
  selector: 'app-match-page',
  templateUrl: './match-page.component.html',
  styleUrls: ['./match-page.component.scss']
})
export class MatchPageComponent implements OnInit {

  selectedMatch: Match;
  selectedMatchId: number;
  formattedTime: string;

  constructor(private competitionService: CompetitionService, private route: ActivatedRoute, private datepipe: DatePipe) { }

  ngOnInit() {
    this.getSelectedMatchId();
    this.competitionService.getMatch(this.selectedMatchId).subscribe(match => {
      this.selectedMatch = match.match;
      this.formattedTime = this.datepipe.transform(this.selectedMatch.utcDate, 'yyyy.MM.dd HH:mm')
    });
  }

  getSelectedMatchId() {
    this.route.paramMap.subscribe(params => {
      this.selectedMatchId = parseInt(params.get("id"));
    })
  }

}
