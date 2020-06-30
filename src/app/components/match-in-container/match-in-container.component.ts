import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-match-in-container',
  templateUrl: './match-in-container.component.html',
  styleUrls: ['./match-in-container.component.scss']
})
export class MatchInContainerComponent implements OnInit {

  @Input() match: Match;
  formattedTime: string;
  
  constructor(public datepipe: DatePipe) { }

  ngOnInit() {
    this.formattedTime = this.datepipe.transform(this.match.utcDate, 'yyyy.MM.dd HH:mm')
  }
}
