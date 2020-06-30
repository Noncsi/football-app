import { HomeTeam } from './homeTeam';
import { AwayTeam } from './awayTeam';
import { Competition } from './competition';
import { MatchTimePart } from './matchTimePart';
import { MatchStatus } from './matchStatus';

export class Match {
    id: number;
    status: MatchStatus;
    utcDate: string;
    score: MatchTimePart;
    homeTeam: HomeTeam;
    awayTeam: AwayTeam;
    competition: Competition;
    venue: string;
}