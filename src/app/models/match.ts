class MatchList {
    match: Match
}

class Match {
    id: number;
    status: matchStatus;
    utcDate: string;
    score: WhichTime;
    homeTeam: HomeTeam;
    awayTeam: AwayTeam;
    competition: Competition;
}

const enum matchStatus {
    live = 'LIVE',
    scheduled = 'SCHEDULED',
    inPlay = 'IN_PLAY',
    paused = 'PAUSED'
}

class WhichTime {
    fullTime: TeamScore
}

class TeamScore {
    homeTeam: number;
    awayTeam: number;
}

class HomeTeam {
    name: string
}

class AwayTeam {
    name: string
}