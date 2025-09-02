// src/components/EventListItem.tsx
// Componente reutilizável para exibir um evento na lista principal.

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Event } from '../types/api';

interface EventListItemProps {
  event: Event;
  onPress: () => void;
}

const EventListItem: React.FC<EventListItemProps> = ({ event, onPress }) => {
  const formatDate = (start: string) => {
    const date = new Date(start);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    };
    return date.toLocaleDateString('pt-BR', options);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.details}>{formatDate(event.startsAt)}</Text>
      <Text style={styles.details}>{event.location}</Text>
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>Total: {event.stats.total}</Text>
        <Text style={styles.statsText}>Presentes: {event.stats.checkedIn}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1c1c1e',
  },
  details: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  statsText: {
    fontSize: 13,
    color: '#333',
    marginRight: 16,
    fontWeight: '500',
  },
});

export default EventListItem;
