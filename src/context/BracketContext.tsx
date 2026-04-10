import React, { createContext, useContext, useState } from 'react';
import { BracketState, Match, Team } from '../types';
import { INITIAL_BRACKET } from '../data';

interface BracketContextType {
  state: BracketState;
  setUserName: (name: string) => void;
  selectTeam: (matchId: string, position: 'team1' | 'team2', team: Team) => void;
  selectWinner: (matchId: string, team: Team) => void;
  resetBracket: () => void;
  getSelectedTeamsIds: () => string[];
}

const BracketContext = createContext<BracketContextType | undefined>(undefined);

export const BracketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<BracketState>({
    matches: { ...INITIAL_BRACKET },
    userName: '',
  });

  const setUserName = (name: string) => {
    setState((prev) => ({ ...prev, userName: name }));
  };

  const selectTeam = (matchId: string, position: 'team1' | 'team2', team: Team) => {
    setState((prev) => {
      const newMatches = { ...prev.matches };
      const currentMatch = newMatches[matchId];
      if (!currentMatch) return prev;

      // Asignamos el equipo al slot de la fase inicial
      newMatches[matchId] = {
        ...currentMatch,
        [position]: team,
        winner: null // reseteamos el ganador si cambian los participantes libres
      };

      // Limpieza en cascada si cambiamos un origen
      if (currentMatch.nextMatchId) {
          clearFuturePaths(newMatches, matchId);
      }

      return { ...prev, matches: newMatches };
    });
  };

  const getSelectedTeamsIds = () => {
    // Retorna todos los IDs de equipos que ya fueron ubicados en los 32 cupos del Round 0
    const ids: string[] = [];
    Object.values(state.matches).forEach(m => {
      if (m.round === 0) {
        if (m.team1) ids.push(m.team1.id);
        if (m.team2) ids.push(m.team2.id);
      }
    });
    return ids;
  };

  const selectWinner = (matchId: string, team: Team) => {
    setState((prev) => {
      const newMatches = { ...prev.matches };
      const currentMatch = newMatches[matchId];
      if (!currentMatch) return prev;

      newMatches[matchId] = { ...currentMatch, winner: team };

      // Si tiene nextMatch (es decir, no es la final)
      if (currentMatch.nextMatchId) {
        const nextId = currentMatch.nextMatchId;
        const nextMatch = newMatches[nextId];
        
        const prevMatchesAlimentadores = Object.values(newMatches).filter(m => m.nextMatchId === nextId);
        prevMatchesAlimentadores.sort((a, b) => a.id.localeCompare(b.id)); // m1 y m2
        
        const isTeam1 = prevMatchesAlimentadores[0]?.id === matchId;
        
        newMatches[nextId] = {
          ...nextMatch,
          team1: isTeam1 ? team : nextMatch.team1,
          team2: !isTeam1 ? team : nextMatch.team2,
          winner: null 
        };
        
        // Cascading nullify for subsequent rounds
        let currentCascadeId = newMatches[nextId].nextMatchId;
        while (currentCascadeId) {
            newMatches[currentCascadeId] = {
                ...newMatches[currentCascadeId],
                 winner: null,
                 team1: newMatches[currentCascadeId].team1?.id === team.id ? null : newMatches[currentCascadeId].team1,
                 team2: newMatches[currentCascadeId].team2?.id === team.id ? null : newMatches[currentCascadeId].team2,
            }
            currentCascadeId = newMatches[currentCascadeId].nextMatchId;
        }
      }

      return { ...prev, matches: newMatches };
    });
  };

  const clearFuturePaths = (matches: Record<string, Match>, sourceMatchId: string) => {
    // Función auxiliar para limpiar rutas cuando se cambia un equipo originario
    const currentMatch = matches[sourceMatchId];
    if (!currentMatch || !currentMatch.nextMatchId) return;

    let nextId: string | undefined = currentMatch.nextMatchId;
    let feederId = sourceMatchId;

    while (nextId) {
        const nextMatch = matches[nextId];
        const prevMatchesAlimentadores = Object.values(matches).filter(m => m.nextMatchId === nextId);
        prevMatchesAlimentadores.sort((a, b) => a.id.localeCompare(b.id));
        const isTeam1 = prevMatchesAlimentadores[0]?.id === feederId;
        
        matches[nextId] = {
            ...nextMatch,
            team1: isTeam1 ? null : nextMatch.team1,
            team2: !isTeam1 ? null : nextMatch.team2,
            winner: null
        };
        feederId = nextId;
        nextId = matches[nextId].nextMatchId;
    }
  }

  const resetBracket = () => {
    setState({ matches: { ...INITIAL_BRACKET }, userName: state.userName });
  };

  return (
    <BracketContext.Provider value={{ state, setUserName, selectTeam, selectWinner, resetBracket, getSelectedTeamsIds }}>
      {children}
    </BracketContext.Provider>
  );
};

export const useBracket = () => {
  const context = useContext(BracketContext);
  if (context === undefined) {
    throw new Error('useBracket must be used within a BracketProvider');
  }
  return context;
};
