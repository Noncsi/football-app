import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, Time } from '@angular/common';

import { CompetitionService } from 'src/app/services/competition.service';
import { prepareSyntheticListenerFunctionName } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-match-page',
  templateUrl: './match-page.component.html',
  styleUrls: ['./match-page.component.scss']
})
export class MatchPageComponent implements OnInit, OnDestroy {

  selectedMatch: Match;
  selectedMatchId: number;
  formattedTime: string;

  get inPlay() { return matchStatus.inPlay; }
  get paused() { return matchStatus.paused; }
  get scheduled() { return matchStatus.scheduled; }

  timer;

  constructor(private competitionService: CompetitionService, private route: ActivatedRoute, private datepipe: DatePipe) { }

  ngOnInit() {
    this.getSelectedMatchId();
    this.competitionService.getMatch(this.selectedMatchId).subscribe(match => {
      this.selectedMatch = match.match;
      this.formattedTime = this.datepipe.transform(this.selectedMatch.utcDate, 'yyyy.MM.dd HH:mm')
      if (this.selectedMatch.status == this.scheduled && this.selectedMatch.utcDate != null) {
        this.countDown(this.formattedTime, 'daySlot', 'hourSlot', 'minuteSlot', 'secondSlot');
      }
    });
  }

  getSelectedMatchId() {
    this.route.paramMap.subscribe(params => {
      this.selectedMatchId = parseInt(params.get("id"));
    })
  }

  countDown(dateTime, htmlDay, htmlHour, htmlMinutes, htmlSeconds) {
    let end: Date = new Date(dateTime);
    let second = 1000;
    let minute = second * 60;
    let hour = minute * 60;
    let day = hour * 24;

    function showRemaining() {
      let now: Date = new Date();
      let distance = end.getTime() - now.getTime();
      let days = Math.floor(distance / day);
      let hours = Math.floor((distance % day) / hour);
      let minutes = Math.floor((distance % hour) / minute);
      let seconds = Math.floor((distance % minute) / second);
      let preDigit = '0';

      if (htmlDay != null && htmlHour != null && htmlMinutes != null && htmlSeconds != null) {
        document.getElementById(htmlDay).innerHTML = days.toString();

        if (hours.toString().length < 2) {
          document.getElementById(htmlHour).innerHTML = preDigit + hours.toString();
        } else {
          document.getElementById(htmlHour).innerHTML = hours.toString();
        }

        if (minutes.toString().length < 2) {
          document.getElementById(htmlMinutes).innerHTML = preDigit + minutes.toString();
        } else {
          document.getElementById(htmlMinutes).innerHTML = minutes.toString();
        }

        if (seconds.toString().length < 2) {
          document.getElementById(htmlSeconds).innerHTML = preDigit + seconds.toString();
        } else {
          document.getElementById(htmlSeconds).innerHTML = seconds.toString();
        }
      }
    }
    this.timer = setInterval(showRemaining, 1000);

  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}

