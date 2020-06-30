import { Component, Input } from '@angular/core';
import { Match } from 'src/app/models/match';

@Component({
  selector: 'app-match-container',
  templateUrl: './match-container.component.html',
  styleUrls: ['./match-container.component.scss']
})
export class MatchContainerComponent {

  @Input() title: string;
  @Input() matchList: Match[];
}
