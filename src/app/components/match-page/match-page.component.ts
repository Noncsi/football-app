import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { CompetitionService } from 'src/app/services/competition.service';
import { Match } from 'src/app/models/match';
import { MatchStatus } from 'src/app/models/MatchStatus';

@Component({
  selector: 'app-match-page',
  templateUrl: './match-page.component.html',
  styleUrls: ['./match-page.component.scss']
})
export class MatchPageComponent implements OnInit, OnDestroy {

  selectedMatch: Match;
  selectedMatchId: number;
  formattedTime: string;
  MatchStatus = MatchStatus;
  timer: number;

  constructor(private competitionService: CompetitionService, private route: ActivatedRoute, private datePipe: DatePipe) { }

  ngOnInit() {
    this.getSelectedMatchId();
    this.competitionService.getMatch(this.selectedMatchId).subscribe(match => {
      this.selectedMatch = match.match;
      console.log(this.selectedMatch)
      this.formattedTime = this.datePipe.transform(this.selectedMatch.utcDate, 'yyyy.MM.dd HH:mm')
      if (this.selectedMatch.status == MatchStatus.scheduled && this.selectedMatch.utcDate != null) {
        this.countDown(this.formattedTime, 'daySlot', 'hourSlot', 'minuteSlot', 'secondSlot');
      }
    });
  }

  getSelectedMatchId() {
    this.route.paramMap.subscribe(params => {
      this.selectedMatchId = parseInt(params.get("id"));
    })
  }

  countDown(dateTime: string, htmlDay: string, htmlHours: string, htmlMinutes: string, htmlSeconds: string) {
    let end: Date = new Date(dateTime);
    let second = 1000;
    let minute = second * 60;
    let hour = minute * 60;
    let day = hour * 24;

    function showRemaining() {
      const now: Date = new Date();
      let distance = end.getTime() - now.getTime();
      const days = Math.floor(distance / day);
      const hours = Math.floor((distance % day) / hour).toString();
      const minutes = Math.floor((distance % hour) / minute).toString();
      const seconds = Math.floor((distance % minute) / second).toString();

      document.getElementById(htmlDay).innerHTML = days.toString();
      MatchPageComponent.addToHTML(hours, htmlHours);
      MatchPageComponent.addToHTML(minutes, htmlMinutes);
      MatchPageComponent.addToHTML(seconds, htmlSeconds);
    }
    this.timer = window.setInterval(showRemaining, 1000);
  }

  static addToHTML(inputNumber: string, targetElementId: string) {
    if (inputNumber.length < 2) {
      document.getElementById(targetElementId).innerHTML = 0 + inputNumber.toString();
    } else {
      document.getElementById(targetElementId).innerHTML = inputNumber.toString();
    }
  }

  ngOnDestroy(): void {
    window.clearInterval(this.timer);
  }
}

