import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { CompetitonList } from '../models/competition-list';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  private competitionUrl = 'https://api.football-data.org/v2/';

  constructor(private http: HttpClient) { this.getCompetitions() }

  availableCompetitionIds: number[] = [2000, 2001, 2002, 2003, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2021];

  competitionSubject = new ReplaySubject<Competition[]>();
  
  selectedCompetitionSubject = new BehaviorSubject<Competition>(null);

  getCompetitions() {
    this.http.get<CompetitonList>(`${this.competitionUrl}competitions`).subscribe(comps => {
      this.competitionSubject.next(comps.competitions.filter(c => this.availableCompetitionIds.includes(c.id)));
    });
  }

  getMatches(competitionId: number, status: matchStatus): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.competitionUrl}competitions/${competitionId}/matches?status=${status}`);
  }

  getMatch(matchId: number): Observable<MatchList> {
    return this.http.get<MatchList>(`${this.competitionUrl}matches/${matchId}`)
  }
}
