export interface Team {
  id: string;
  name: string;
  code: string;
  group: string;
}

export interface Match {
  id: string; // e.g., 'm1'
  team1: Team | null;
  team2: Team | null;
  winner: Team | null;
  nextMatchId?: string; // id of the match the winner goes to
  label1?: string; // e.g. "1E"
  label2?: string; // e.g. "3 ABCDF"
  round: number; // 0 = 32avos, 1 = 16vos...
}

export interface BracketState {
  matches: Record<string, Match>;
  userName: string;
}
