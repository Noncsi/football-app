import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-match-container',
  templateUrl: './match-container.component.html',
  styleUrls: ['./match-container.component.scss']
})
export class MatchContainerComponent implements OnInit {

  @Input() title: string;
  @Input() matchList: Match[];
  
  constructor() { }

  ngOnInit() {
  }

}
