// src/components/KpiCard.tsx
// Componente reutilizável para exibir os KPIs do evento.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface KpiCardProps {
  label: string;
  value: number;
  color: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ label, value, color }) => {
  return (
    <View style={[styles.card, { borderTopColor: color }]}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { flex: 1, alignItems: 'center', padding: 15, marginHorizontal: 5, backgroundColor: '#fff', borderRadius: 12, borderTopWidth: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
  value: { fontSize: 28, fontWeight: 'bold', color: '#1c1c1e' },
  label: { fontSize: 14, color: '#888', marginTop: 4 },
});

export default KpiCard;
