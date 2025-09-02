// src/components/AttendeeItem.tsx
// Componente para renderizar cada item na lista de participantes.

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Attendee } from '../types/api';

interface AttendeeItemProps {
  attendee: Attendee;
  onCheckIn: (attendee: Attendee) => void;
}

const AttendeeItem: React.FC<AttendeeItemProps> = ({ attendee, onCheckIn }) => {
  const isCheckedIn = !!attendee.checkedInAt;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onCheckIn(attendee)}
      disabled={isCheckedIn}
      accessibilityLabel={`Realizar check-in de ${attendee.name}`}
      accessibilityState={{ disabled: isCheckedIn }}
    >
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{attendee.name}</Text>
        <Text style={styles.secondaryInfo}>{attendee.email}</Text>
      </View>
      <View style={[styles.statusChip, isCheckedIn ? styles.checkedIn : styles.absent]}>
        <Text style={styles.statusText}>{isCheckedIn ? 'Presente' : 'Ausente'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#eee', backgroundColor: '#fff' },
  infoContainer: { flex: 1, marginRight: 10 },
  name: { fontSize: 16, fontWeight: '600', color: '#1c1c1e' },
  secondaryInfo: { fontSize: 14, color: '#888', marginTop: 2 },
  statusChip: { paddingVertical: 5, paddingHorizontal: 12, borderRadius: 15 },
  checkedIn: { backgroundColor: 'rgba(52, 199, 89, 0.1)' },
  absent: { backgroundColor: 'rgba(142, 142, 147, 0.1)' },
  statusText: { fontWeight: '600', fontSize: 12, color: '#1c1c1e' },
});

export default AttendeeItem;
