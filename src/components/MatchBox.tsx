import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Match, Team } from '../types';
import { COLORS, SIZES } from '../constants/theme';
import { SelectionReq } from './SelectionModal';

interface MatchBoxProps {
  match: Match;
  onPressSlot: (req: SelectionReq) => void;
  isLeftBracket?: boolean;
}

export const MatchBox = ({ match, onPressSlot, isLeftBracket = true }: MatchBoxProps) => {

  const hasWinner = match.winner !== null;

  const renderSlot = (position: 'team1' | 'team2', team: Team | null, label?: string) => {
    return (
      <TouchableOpacity 
        style={[styles.slot, hasWinner && match.winner?.id === team?.id ? styles.slotWinner : null]} 
        onPress={() => onPressSlot({ match, position })}
        activeOpacity={0.7}
      >
        {team ? (
          <View style={[styles.innerContent, !isLeftBracket && { flexDirection: 'row-reverse' }]}>
            <Image 
              source={{ uri: `https://flagcdn.com/w40/${team.code}.png` }} 
              style={styles.flag}
            />
            <Text style={styles.teamCode} numberOfLines={1}>{team.id}</Text>
          </View>
        ) : (
          <View style={styles.placeholderContainer}>
             <Text style={styles.placeholderText}>
               {label || '?'}
             </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
       <View style={styles.boxWrapper}>
         {renderSlot('team1', match.team1, match.label1)}
         <View style={styles.divider} />
         {renderSlot('team2', match.team2, match.label2)}
       </View>
       
       {/* Botón central para seleccionar al ganador de esta llave (si los dos equipos están puestos) */}
       {match.team1 && match.team2 && !hasWinner && match.round !== 4 && (
         <TouchableOpacity 
            style={[styles.winnerSelectorLeft, !isLeftBracket && styles.winnerSelectorRight]} 
            onPress={() => onPressSlot({ match, position: 'winner' })}
         >
           <Text style={styles.advanceText}>{'>'}</Text>
         </TouchableOpacity>
       )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    width: SIZES.boxWidth,
    height: SIZES.boxHeight * 1.5,
    justifyContent: 'center',
    position: 'relative',
  },
  boxWrapper: {
    flex: 1,
    backgroundColor: COLORS.boxBackground,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.border,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  slot: {
    flex: 1,
    justifyContent: 'center',
  },
  slotWinner: {
    backgroundColor: COLORS.boxBackgroundSelected,
  },
  divider: {
    height: 2,
    backgroundColor: COLORS.border,
  },
  innerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    height: '100%',
  },
  flag: {
    width: 20,
    height: 14,
    borderRadius: 2,
    marginRight: 6,
    marginLeft: 6,
    borderWidth: 1,
    borderColor: '#eee', // Slight border for flags on white bg
  },
  teamCode: {
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    fontSize: 12,
  },
  placeholderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  winnerSelectorLeft: {
    position: 'absolute',
    right: -15,
    top: '50%',
    marginTop: -10,
    width: 20,
    height: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  winnerSelectorRight: {
     right: 'auto',
     left: -15,
  },
  advanceText: {
     color: COLORS.black,
     fontSize: 12,
     fontWeight: 'bold',
  }
});
