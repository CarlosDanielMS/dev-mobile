// src/screens/EventScreen.tsx
// Tela que exibe os detalhes e KPIs do evento.

import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute, useFocusEffect, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getEventDetails } from '../api/apiService';
import { Event } from '../types/api';
import { RootStackParamList } from './App';
import KpiCard from '../components/KpiCard';

type EventScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Event'>;
type EventScreenRouteProp = RouteProp<RootStackParamList, 'Event'>;

const EventScreen = () => {
  const navigation = useNavigation<EventScreenNavigationProp>();
  const route = useRoute<EventScreenRouteProp>();
  const { eventId } = route.params;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEventData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEventDetails(eventId);
      setEvent(data);
    } catch (err) {
      setError('Não foi possível carregar os dados do evento. Verifique sua conexão.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  // useFocusEffect recarrega os dados sempre que a tela ganha foco.
  useFocusEffect(
    useCallback(() => {
      fetchEventData();
    }, [fetchEventData])
  );

  const formatDate = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit', month: '2-digit', year: 'numeric',
    };
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit', minute: '2-digit',
    };
    return `${startDate.toLocaleDateString('pt-BR', options)} das ${startDate.toLocaleTimeString('pt-BR', timeOptions)} às ${endDate.toLocaleTimeString('pt-BR', timeOptions)}`;
  };

  if (loading) {
    return <View style={styles.centered}><ActivityIndicator size="large" color="#007AFF" /></View>;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchEventData}>
          <Text style={styles.retryButtonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!event) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.details}>{formatDate(event.startsAt, event.endsAt)}</Text>
        <Text style={styles.details}>{event.location}</Text>
      </View>

      <View style={styles.kpiContainer}>
        <KpiCard label="Total" value={event.stats.total} color="#007AFF" />
        <KpiCard label="Presentes" value={event.stats.checkedIn} color="#34C759" />
        <KpiCard label="Ausentes" value={event.stats.absent} color="#FF3B30" />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Attendees', { eventId, eventTitle: event.title })}
        accessibilityLabel="Ver lista de participantes do evento"
      >
        <Text style={styles.buttonText}>Ver Participantes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f0f7' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  header: { marginBottom: 30, padding: 20, backgroundColor: '#fff', borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#1c1c1e' },
  details: { fontSize: 16, color: '#666', marginBottom: 4 },
  kpiContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30 },
  button: { backgroundColor: '#007AFF', paddingVertical: 15, borderRadius: 12, alignItems: 'center', shadowColor: '#007AFF', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 6 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  errorText: { fontSize: 16, color: '#FF3B30', textAlign: 'center', marginBottom: 20 },
  retryButton: { backgroundColor: '#007AFF', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  retryButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default EventScreen;
