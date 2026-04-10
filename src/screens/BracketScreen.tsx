import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';
import { useBracket } from '../context/BracketContext';
import { MatchBox } from '../components/MatchBox';
import { SelectionModal, SelectionReq } from '../components/SelectionModal';
import { Team } from '../types';
import { COLORS } from '../constants/theme';
import { Trophy, Download } from 'lucide-react-native';

export const BracketScreen = () => {
  const { state, selectTeam, selectWinner } = useBracket();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectionReq, setSelectionReq] = useState<SelectionReq | null>(null);

  const bracketRef = useRef<View>(null);

  const handleSlotPress = (req: SelectionReq) => {
    setSelectionReq(req);
    setModalVisible(true);
  };

  const handleSelectTeam = (team: Team) => {
    if (selectionReq) {
      if (selectionReq.position === 'winner') {
        selectWinner(selectionReq.match.id, team);
      } else {
        selectTeam(selectionReq.match.id, selectionReq.position, team);
      }
    }
  };

  const captureAndDownload = async () => {
    if (bracketRef.current) {
      try {
        const domNode = (bracketRef.current as any);
        const dataUrl = await toPng(domNode, {
          cacheBust: true,
          style: { backgroundColor: COLORS.background },
          pixelRatio: 2
        });
        saveAs(dataUrl, `Pronostico_${state.userName.replace(/\s/g, '_')}_Mundial26.png`);
      } catch (err) {
        console.error('Error al generar la imagen', err);
        alert('Hubo un error generando la imagen. Por favor intenta desde otro navegador.');
      }
    }
  };

  const { matches } = state;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topBar}>
        <Image
          source={require('../../assets/images/panpaya.png')}
          style={styles.logoTiny}
          resizeMode="contain"
        />
        <TouchableOpacity style={styles.downloadButton} onPress={captureAndDownload}>
          <Download size={20} color={COLORS.primary} />
          <Text style={styles.downloadText}>Guardar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.subHeader}>
        <Text style={styles.headerTitle}>Prode de {state.userName}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.verticalScroll}>
        <ScrollView horizontal contentContainerStyle={styles.scrollContent}>
        <View style={styles.bracketWrapper} ref={bracketRef} id="bracket-capture-area">
          {/* Logo Central Puesto en la Imagen para la exportación */}
          <View style={styles.backgroundCenter}>
            <Trophy size={150} color="#FFD700" style={styles.trophyIcon} opacity={0.15} />
            <Text style={styles.worldChampionsText}>COPA MUNDIAL DE LA FIFA 2026</Text>

            {/* Final Spot */}
            <View style={styles.finalBoxContainer}>
              <MatchBox match={matches['final']} onPressSlot={handleSlotPress} isLeftBracket={true} />
            </View>

            {/* Box for absolute winner (Champion) */}
            <View style={styles.championBoxContainer}>
              {matches['final'].winner && (
                <View style={styles.championDisplay}>
                  <Image
                    source={{ uri: `https://flagcdn.com/w40/${matches['final'].winner.code}.png` }}
                    style={{ width: 40, height: 28, borderRadius: 3, marginRight: 8 }}
                  />
                  <Text style={styles.championName}>{matches['final'].winner.name}</Text>
                </View>
              )}
            </View>

            <Text style={styles.watermarkText}>Pronóstico de: {state.userName}</Text>
            <Image
              source={require('../../assets/images/panpaya.png')}
              style={styles.logoWatermark}
              resizeMode="contain"
            />
          </View>

          {/* LEFT SIDE */}
          <View style={styles.side}>
            <View style={styles.column}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <MatchBox key={`m${i}`} match={matches[`m${i}`]} onPressSlot={handleSlotPress} />)}
            </View>
            <View style={styles.columnSpace}>
              {[1, 2, 3, 4].map(i => <MatchBox key={`q${i}`} match={matches[`q${i}`]} onPressSlot={handleSlotPress} />)}
            </View>
            <View style={styles.columnSpaceLg}>
              <MatchBox match={matches['s1']} onPressSlot={handleSlotPress} />
              <MatchBox match={matches['s2']} onPressSlot={handleSlotPress} />
            </View>
            <View style={styles.columnSpaceXl}>
              <MatchBox match={matches['semi1']} onPressSlot={handleSlotPress} />
            </View>
          </View>

          {/* CENTER GAP (To give space for the final) */}
          <View style={styles.centerGap} />

          {/* RIGHT SIDE */}
          <View style={[styles.side, { flexDirection: 'row-reverse' }]}>
            <View style={styles.column}>
              {[9, 10, 11, 12, 13, 14, 15, 16].map(i => <MatchBox key={`m${i}`} match={matches[`m${i}`]} onPressSlot={handleSlotPress} isLeftBracket={false} />)}
            </View>
            <View style={styles.columnSpace}>
              {[5, 6, 7, 8].map(i => <MatchBox key={`q${i}`} match={matches[`q${i}`]} onPressSlot={handleSlotPress} isLeftBracket={false} />)}
            </View>
            <View style={styles.columnSpaceLg}>
              <MatchBox match={matches['s3']} onPressSlot={handleSlotPress} isLeftBracket={false} />
              <MatchBox match={matches['s4']} onPressSlot={handleSlotPress} isLeftBracket={false} />
            </View>
            <View style={styles.columnSpaceXl}>
              <MatchBox match={matches['semi2']} onPressSlot={handleSlotPress} isLeftBracket={false} />
            </View>
          </View>

        </View>
      </ScrollView>
      </ScrollView>

      <SelectionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        selectionObj={selectionReq}
        onSelectTeam={handleSelectTeam}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#C51921', // Un rojo un poco más oscuro para el header
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  logoTiny: {
    width: 100,
    height: 30,
  },
  subHeader: {
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#B5151D',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  downloadText: {
    color: COLORS.primary,
    marginLeft: 6,
    fontWeight: 'bold',
  },
  verticalScroll: {
    flexGrow: 1,
  },
  scrollContent: {
    paddingVertical: 20,
    minWidth: 1100,
    flexGrow: 1,
  },
  bracketWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 900,
    position: 'relative',
    backgroundColor: COLORS.background, 
  },
  backgroundCenter: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  trophyIcon: {
    position: 'absolute',
    top: '30%',
  },
  worldChampionsText: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 2,
    position: 'absolute',
    top: 60,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  finalBoxContainer: {
    position: 'absolute',
    top: 200,
  },
  championBoxContainer: {
    position: 'absolute',
    top: 320,
  },
  championDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CCC',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  championName: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  watermarkText: {
    color: COLORS.white,
    opacity: 0.9,
    fontSize: 18,
    fontWeight: '600',
    position: 'absolute',
    bottom: 120,
  },
  logoWatermark: {
    width: 200,
    height: 60,
    position: 'absolute',
    bottom: 40,
  },
  side: {
    flexDirection: 'row',
    width: '40%',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  centerGap: {
    width: '20%',
  },
  column: {
    justifyContent: 'space-around',
    height: '100%',
  },
  columnSpace: {
    justifyContent: 'space-around',
    height: '100%',
    paddingVertical: '5%',
  },
  columnSpaceLg: {
    justifyContent: 'space-around',
    height: '100%',
    paddingVertical: '15%',
  },
  columnSpaceXl: {
    justifyContent: 'space-around',
    height: '100%',
    paddingVertical: '30%',
  }
});
