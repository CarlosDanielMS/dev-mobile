// src/screens/AttendeesScreen.tsx
// Tela que lista os participantes com busca e check-in.

import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, FlatList, StyleSheet, TextInput, ActivityIndicator,
  RefreshControl, TouchableOpacity, Alert,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { getAttendees, checkInAttendee } from '../api/apiService';
import { Attendee } from '../types/api';
import { RootStackParamList } from '../../app';
import AttendeeItem from '../components/AttendeeItem';
import useDebounce from '../hooks/useDebounce';

type AttendeesScreenRouteProp = RouteProp<RootStackParamList, 'Attendees'>;

const AttendeesScreen = () => {
  const route = useRoute<AttendeesScreenRouteProp>();
  const { eventId } = route.params;

  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const fetchAttendees = useCallback(async (isRefresh = false, isLoadMore = false) => {
    const currentPage = isRefresh ? 1 : page;
    if (loading || (isLoadMore && page > totalPages)) return;

    if (isLoadMore) setLoadingMore(true);
    else setLoading(true);
    
    setError(null);

    try {
      const response = await getAttendees(eventId, debouncedSearchQuery, currentPage);
      setAttendees(prev => (isRefresh || !isLoadMore) ? response.data : [...prev, ...response.data]);
      setPage(currentPage + 1);
      setTotalPages(Math.ceil(response.total / response.limit));
    } catch (err) {
      setError('Falha ao buscar participantes.');
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      if (isRefresh) setRefreshing(false);
    }
  }, [eventId, debouncedSearchQuery, page, totalPages, loading]);

  useEffect(() => {
    setAttendees([]);
    setPage(1);
    setTotalPages(1);
    fetchAttendees(true);
  }, [debouncedSearchQuery]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchAttendees(true);
  };

  const handleLoadMore = () => {
    if (!loadingMore && page <= totalPages) {
      fetchAttendees(false, true);
    }
  };

  const handleCheckIn = (attendee: Attendee) => {
    Alert.alert(
      'Confirmar Check-in',
      `Deseja confirmar a presença de ${attendee.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: async () => {
            try {
              await checkInAttendee(eventId, attendee.id);
              setAttendees(prev =>
                prev.map(item =>
                  item.id === attendee.id
                    ? { ...item, checkedInAt: new Date().toISOString() }
                    : item
                )
              );
              Alert.alert('Sucesso', `${attendee.name} teve a presença confirmada!`);
            } catch (error: any) {
              if (error.response?.status === 409) {
                 const checkedInTime = new Date(error.response.data.checkedInAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                 Alert.alert('Aviso', `Este participante já fez check-in às ${checkedInTime}.`);
              } else {
                 Alert.alert('Erro', 'Não foi possível realizar o check-in. Tente novamente.');
              }
            }
          },
        },
      ]
    );
  };

  const renderFooter = () => (loadingMore ? <ActivityIndicator style={{ marginVertical: 20 }} /> : null);

  const renderEmptyComponent = () => (
    <View style={styles.centered}>
      {!loading && (
        <Text style={styles.emptyText}>
          {searchQuery ? `Nenhum resultado para "${searchQuery}"` : 'Nenhum participante encontrado.'}
        </Text>
      )}
    </View>
  );

  return (
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nome, e-mail ou documento..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {loading && attendees.length === 0 ? (
          <View style={styles.centered}><ActivityIndicator size="large" color="#007AFF" /></View>
        ) : error ? (
          <View style={styles.centered}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={() => fetchAttendees(true)}>
              <Text style={styles.retryButtonText}>Tentar Novamente</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={attendees}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <AttendeeItem attendee={item} onCheckIn={handleCheckIn} />}
            contentContainerStyle={{ paddingBottom: 20 }}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmptyComponent}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={["#007AFF"]} />
            }
          />
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  searchInput: { height: 44, borderColor: '#ddd', borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, margin: 15, backgroundColor: '#f8f8f8', fontSize: 16 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 },
  emptyText: { fontSize: 16, color: '#888' },
  errorText: { fontSize: 16, color: '#FF3B30', textAlign: 'center', marginBottom: 20 },
  retryButton: { backgroundColor: '#007AFF', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  retryButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default AttendeesScreen;
