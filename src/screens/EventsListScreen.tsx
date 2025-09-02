// src/screens/EventsListScreen.tsx
// Nova tela principal que lista todos os eventos disponíveis.

import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getEventsList } from '../api/apiService';
import { Event } from '../types/api';
import { RootStackParamList } from '../../App';
import EventListItem from '../components/EventListItem';
import { AxiosError } from 'axios';

type EventsListNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EventsList'>;

const EventsListScreen = () => {
  const navigation = useNavigation<EventsListNavigationProp>();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEventsList();
      setEvents(data);
    } catch (err) {
      // --- MUDANÇA AQUI ---
      // Agora vamos capturar e exibir um erro mais detalhado.
      const axiosError = err as AxiosError;
      console.error('DETALHES DO ERRO:', JSON.stringify(axiosError, null, 2));

      let errorMessage = 'Ocorreu um erro desconhecido.';
      if (axiosError.isAxiosError && !axiosError.response) {
        errorMessage = 'Erro de conexão: Verifique o endereço da API e sua rede.';
      } else if (axiosError.response) {
        errorMessage = `Erro do servidor: Status ${axiosError.response.status}`;
      }
      setError(errorMessage);
      // --- FIM DA MUDANÇA ---
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchEvents();
    }, [fetchEvents])
  );

  if (loading) {
    return <View style={styles.centered}><ActivityIndicator size="large" color="#007AFF" /></View>;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchEvents}>
          <Text style={styles.retryButtonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <EventListItem
          event={item}
          onPress={() => navigation.navigate('Event', { eventId: item.id })}
        />
      )}
      contentContainerStyle={styles.listContainer}
      ListHeaderComponent={() => (
        <Text style={styles.title}>Próximos Eventos</Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0fT7',
  },
  listContainer: {
    padding: 10,
    backgroundColor: '#f0f0f7',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1c1c1e',
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 10,
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EventsListScreen;
