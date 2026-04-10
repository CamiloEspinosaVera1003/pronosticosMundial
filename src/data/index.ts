import { Team, Match } from '../types';

export const TEAMS: Team[] = [
  // Group A
  { id: 'MEX', name: 'México', code: 'mx', group: 'A' },
  { id: 'RSA', name: 'Sudáfrica', code: 'za', group: 'A' },
  { id: 'KOR', name: 'Corea', code: 'kr', group: 'A' },
  { id: 'CZE', name: 'Rep. Checa', code: 'cz', group: 'A' },
  // Group B
  { id: 'CAN', name: 'Canadá', code: 'ca', group: 'B' },
  { id: 'BIH', name: 'Bosnia', code: 'ba', group: 'B' },
  { id: 'QAT', name: 'Qatar', code: 'qa', group: 'B' },
  { id: 'SUI', name: 'Suiza', code: 'ch', group: 'B' },
  // Group C
  { id: 'BRA', name: 'Brasil', code: 'br', group: 'C' },
  { id: 'MAR', name: 'Marruecos', code: 'ma', group: 'C' },
  { id: 'HAI', name: 'Haití', code: 'ht', group: 'C' },
  { id: 'SCO', name: 'Escocia', code: 'gb-sct', group: 'C' },
  // Group D
  { id: 'USA', name: 'EEUU', code: 'us', group: 'D' },
  { id: 'PAR', name: 'Paraguay', code: 'py', group: 'D' },
  { id: 'AUS', name: 'Australia', code: 'au', group: 'D' },
  { id: 'TUR', name: 'Turquía', code: 'tr', group: 'D' },
  // Group E
  { id: 'GER', name: 'Alemania', code: 'de', group: 'E' },
  { id: 'CPV', name: 'Cabo Verde', code: 'cv', group: 'E' }, // or Curacao? using CV
  { id: 'IRL', name: 'Irlanda', code: 'ie', group: 'E' },
  { id: 'ECU', name: 'Ecuador', code: 'ec', group: 'E' },
  // Group F
  { id: 'NED', name: 'Países Bajos', code: 'nl', group: 'F' },
  { id: 'JPN', name: 'Japón', code: 'jp', group: 'F' },
  { id: 'SWE', name: 'Suecia', code: 'se', group: 'F' },
  { id: 'TUN', name: 'Túnez', code: 'tn', group: 'F' },
  // Group G
  { id: 'BEL', name: 'Bélgica', code: 'be', group: 'G' },
  { id: 'EGY', name: 'Egipto', code: 'eg', group: 'G' },
  { id: 'IRN', name: 'Irán', code: 'ir', group: 'G' },
  { id: 'NZL', name: 'N. Zelanda', code: 'nz', group: 'G' },
  // Group H
  { id: 'ESP', name: 'España', code: 'es', group: 'H' },
  { id: 'KSA', name: 'A. Saudita', code: 'sa', group: 'H' },
  { id: 'URU', name: 'Uruguay', code: 'uy', group: 'H' },
  { id: 'CIV', name: 'C. de Marfil', code: 'ci', group: 'H' },
  // Group I
  { id: 'FRA', name: 'Francia', code: 'fr', group: 'I' },
  { id: 'SEN', name: 'Senegal', code: 'sn', group: 'I' },
  { id: 'IRQ', name: 'Irak', code: 'iq', group: 'I' },
  { id: 'NOR', name: 'Noruega', code: 'no', group: 'I' },
  // Group J
  { id: 'ARG', name: 'Argentina', code: 'ar', group: 'J' },
  { id: 'ALG', name: 'Argelia', code: 'dz', group: 'J' },
  { id: 'AUT', name: 'Austria', code: 'at', group: 'J' },
  { id: 'JOR', name: 'Jordania', code: 'jo', group: 'J' },
  // Group K
  { id: 'POR', name: 'Portugal', code: 'pt', group: 'K' },
  { id: 'COD', name: 'RD Congo', code: 'cd', group: 'K' },
  { id: 'UZB', name: 'Uzbekistán', code: 'uz', group: 'K' },
  { id: 'COL', name: 'Colombia', code: 'co', group: 'K' },
  // Group L
  { id: 'ENG', name: 'Inglaterra', code: 'gb-eng', group: 'L' },
  { id: 'CRO', name: 'Croacia', code: 'hr', group: 'L' },
  { id: 'GHA', name: 'Ghana', code: 'gh', group: 'L' },
  { id: 'PAN', name: 'Panamá', code: 'pa', group: 'L' },
];

export const INITIAL_BRACKET: Record<string, Match> = {
  // ROUND OF 32 - LEFT
  'm1': { id: 'm1', team1: null, team2: null, winner: null, nextMatchId: 'q1', label1: '1E', label2: '3 ABCDF', round: 0 },
  'm2': { id: 'm2', team1: null, team2: null, winner: null, nextMatchId: 'q1', label1: '1I', label2: '3 CDFGH', round: 0 },
  'm3': { id: 'm3', team1: null, team2: null, winner: null, nextMatchId: 'q2', label1: '2A', label2: '2B', round: 0 },
  'm4': { id: 'm4', team1: null, team2: null, winner: null, nextMatchId: 'q2', label1: '1F', label2: '2C', round: 0 },
  'm5': { id: 'm5', team1: null, team2: null, winner: null, nextMatchId: 'q3', label1: '2K', label2: '2L', round: 0 },
  'm6': { id: 'm6', team1: null, team2: null, winner: null, nextMatchId: 'q3', label1: '1H', label2: '2J', round: 0 },
  'm7': { id: 'm7', team1: null, team2: null, winner: null, nextMatchId: 'q4', label1: '1D', label2: '3 BEFIJ', round: 0 },
  'm8': { id: 'm8', team1: null, team2: null, winner: null, nextMatchId: 'q4', label1: '1G', label2: '3 AEHIJ', round: 0 },

  // ROUND OF 32 - RIGHT
  'm9': { id: 'm9', team1: null, team2: null, winner: null, nextMatchId: 'q5', label1: '1C', label2: '2F', round: 0 },
  'm10': { id: 'm10', team1: null, team2: null, winner: null, nextMatchId: 'q5', label1: '2E', label2: '2I', round: 0 },
  'm11': { id: 'm11', team1: null, team2: null, winner: null, nextMatchId: 'q6', label1: '1A', label2: '3 CEFHI', round: 0 },
  'm12': { id: 'm12', team1: null, team2: null, winner: null, nextMatchId: 'q6', label1: '1L', label2: '3 EHIJK', round: 0 },
  'm13': { id: 'm13', team1: null, team2: null, winner: null, nextMatchId: 'q7', label1: '1J', label2: '2H', round: 0 },
  'm14': { id: 'm14', team1: null, team2: null, winner: null, nextMatchId: 'q7', label1: '2D', label2: '2G', round: 0 },
  'm15': { id: 'm15', team1: null, team2: null, winner: null, nextMatchId: 'q8', label1: '1B', label2: '3 EFGIJ', round: 0 },
  'm16': { id: 'm16', team1: null, team2: null, winner: null, nextMatchId: 'q8', label1: '1K', label2: '3 DEIJL', round: 0 },

  // ROUND OF 16
  'q1': { id: 'q1', team1: null, team2: null, winner: null, nextMatchId: 's1', round: 1 },
  'q2': { id: 'q2', team1: null, team2: null, winner: null, nextMatchId: 's1', round: 1 },
  'q3': { id: 'q3', team1: null, team2: null, winner: null, nextMatchId: 's2', round: 1 },
  'q4': { id: 'q4', team1: null, team2: null, winner: null, nextMatchId: 's2', round: 1 },
  'q5': { id: 'q5', team1: null, team2: null, winner: null, nextMatchId: 's3', round: 1 },
  'q6': { id: 'q6', team1: null, team2: null, winner: null, nextMatchId: 's3', round: 1 },
  'q7': { id: 'q7', team1: null, team2: null, winner: null, nextMatchId: 's4', round: 1 },
  'q8': { id: 'q8', team1: null, team2: null, winner: null, nextMatchId: 's4', round: 1 },

  // QUARTER FINALS
  's1': { id: 's1', team1: null, team2: null, winner: null, nextMatchId: 'semi1', round: 2 },
  's2': { id: 's2', team1: null, team2: null, winner: null, nextMatchId: 'semi1', round: 2 },
  's3': { id: 's3', team1: null, team2: null, winner: null, nextMatchId: 'semi2', round: 2 },
  's4': { id: 's4', team1: null, team2: null, winner: null, nextMatchId: 'semi2', round: 2 },

  // SEMI FINALS
  'semi1': { id: 'semi1', team1: null, team2: null, winner: null, nextMatchId: 'final', round: 3 },
  'semi2': { id: 'semi2', team1: null, team2: null, winner: null, nextMatchId: 'final', round: 3 },

  // FINAL
  'final': { id: 'final', team1: null, team2: null, winner: null, round: 4 },
};

// Helper function to extract allowed groups from a label like "3 ABCDF" or "1E"
export const getFilteredTeams = (label: string): Team[] => {
  if (!label) return TEAMS;
  
  // E.g., "1E" -> groups contains 'E'
  // E.g., "3 ABCDF" -> groups contains 'A', 'B', 'C', 'D', 'F'
  const groupsToMatch = label.replace(/[0-9 ]/g, '').split(''); 
  
  return TEAMS.filter(t => groupsToMatch.includes(t.group));
};
