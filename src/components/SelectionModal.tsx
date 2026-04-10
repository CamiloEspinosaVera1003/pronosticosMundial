import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, FlatList } from 'react-native';
import { Match, Team } from '../types';
import { getFilteredTeams } from '../data';
import { COLORS } from '../constants/theme';
import { useBracket } from '../context/BracketContext';
import { X } from 'lucide-react-native';

export interface SelectionReq {
  match: Match;
  position: 'team1' | 'team2' | 'winner'; // 'winner' for the final Champion
}

interface SelectionModalProps {
  visible: boolean;
  onClose: () => void;
  selectionObj: SelectionReq | null;
  onSelectTeam: (team: Team) => void;
}

export const SelectionModal = ({ visible, onClose, selectionObj, onSelectTeam }: SelectionModalProps) => {
  const { state, getSelectedTeamsIds } = useBracket();
  
  if (!selectionObj) return null;

  const { match, position } = selectionObj;
  let availableTeams: Team[] = [];

  if (position === 'winner') {
     if (match.team1) availableTeams.push(match.team1);
     if (match.team2) availableTeams.push(match.team2);
  } else if (match.round === 0) {
    // 32avos de final: Equipos de acuerdo al label
    const label = position === 'team1' ? match.label1 : match.label2;
    // Opciones del grupo
    availableTeams = getFilteredTeams(label || '');
    const alreadySelectedIds = getSelectedTeamsIds();
    
    // Quitamos los que ya están seleccionados en otras casillas, EXCEPTO si es el que tenemos actualmente puesto en esta misma casilla
    const myCurrentTeamId = match[position]?.id;
    availableTeams = availableTeams.filter(t => !alreadySelectedIds.includes(t.id) || t.id === myCurrentTeamId);

  } else {
    // Rondas avanzadas: los equipos vienen del match alimentador
    const matchesArray = Object.values(state.matches);
    const feeders = matchesArray.filter(m => m.nextMatchId === match.id);
    feeders.sort((a, b) => a.id.localeCompare(b.id)); // Garantizar orden (top vs bottom feed)
    
    // Si la position es team1, corresponde al ganador del FEEDER[0]. Si es team2, FEEDER[1]
    const myFeeder = position === 'team1' ? feeders[0] : feeders[1];
    
    if (myFeeder) {
      if (myFeeder.team1) availableTeams.push(myFeeder.team1);
      if (myFeeder.team2) availableTeams.push(myFeeder.team2);
    }
  }

  const renderItem = ({ item }: { item: Team }) => (
    <TouchableOpacity 
      style={styles.teamRow}
      onPress={() => {
        onSelectTeam(item);
        onClose();
      }}
    >
      <Image source={{ uri: `https://flagcdn.com/w40/${item.code}.png` }} style={styles.flag} />
      <Text style={styles.teamName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Seleccionar Equipo</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>
          
          {availableTeams.length > 0 ? (
            <FlatList
              data={availableTeams}
              keyExtractor={(t) => t.id}
              renderItem={renderItem}
              contentContainerStyle={styles.listContainer}
            />
          ) : (
            <Text style={styles.emptyText}>
              Aún no hay equipos disponibles. Por favor completa los recuadros previos.
            </Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#FAFAFA',
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  listContainer: {
    padding: 16,
  },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#DFDFDF',
  },
  flag: {
    width: 30,
    height: 20,
    borderRadius: 3,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  teamName: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  emptyText: {
    color: COLORS.textSecondary,
    padding: 24,
    textAlign: 'center',
    lineHeight: 22,
  }
});
