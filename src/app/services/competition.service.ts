import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';

import { Competition } from '../models/competition';
import { CompetitionParent } from '../models/competitionParent';
import { MatchStatus } from '../models/matchStatus';
import { MatchParent } from '../models/matchParent';
import { MatchAndHead2Head } from '../models/matchAndHead2Head';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  private apiUrl = 'https://api.football-data.org/v2/';

  constructor(private http: HttpClient) {
    this.emitCompetitions();
  }

  private availableCompetitionIds: number[] = [2000, 2001, 2002, 2003, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2021];
  competitionSubject = new ReplaySubject<Competition[]>();

  emitCompetitions() {
    this.getCompetitions().subscribe(competitionParent => {
      this.competitionSubject.next(competitionParent.competitions.filter(c => this.availableCompetitionIds.includes(c.id)));
    });
  }

  getCompetitions() {
    return this.http.get<CompetitionParent>(`${this.apiUrl}competitions`);
  }

  getMatches(competitionId: number, status: MatchStatus): Observable<MatchParent> {
    return this.http.get<MatchParent>(`${this.apiUrl}competitions/${competitionId}/matches?status=${status}`);
  }

  getMatch(matchId: number): Observable<MatchAndHead2Head> {
    return this.http.get<MatchAndHead2Head>(`${this.apiUrl}matches/${matchId}`)
  }
}
