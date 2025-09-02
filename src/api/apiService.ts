// src/api/apiService.ts
// Centraliza todas as chamadas à API, adicionando o token de autorização.

import axios from 'axios';
import { Event, Attendee, PaginatedAttendeesResponse } from '../types/api';

// --- Configuração da API ---
const BASE_URL = 'http://192.168.64.101:5044'; // Verifique se este IP ainda é o correto
const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJldmVudC1jaGVja2luLWFwaSIsInN1YiI6Im9wZXJhdG9yIiwiZXZlbnRJZCI6ImV2dF8xMjMiLCJpYXQiOjE3MjQ4ODAwMDAsImV4cCI6MTk5OTk5OTk5OX0.8b7cRrJq1u8hQWmF2Z0k3yV5aN4pX6sT9uE1L3cB7Dg';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': TOKEN,
  },
});

// --- Funções da API ---

/**
 * Busca a lista de todos os eventos.
 * (Esta era a função que estava faltando)
 */
export const getEventsList = async (): Promise<Event[]> => {
  const response = await apiClient.get<Event[]>('/events');
  return response.data;
};

/**
 * Busca os detalhes de um evento específico.
 */
export const getEventDetails = async (eventId: string): Promise<Event> => {
  const response = await apiClient.get<Event>(`/events/${eventId}`);
  return response.data;
};

/**
 * Busca a lista de participantes de um evento com paginação e busca.
 */
export const getAttendees = async (
  eventId: string,
  query: string = '',
  page: number = 1
): Promise<PaginatedAttendeesResponse> => {
  const response = await apiClient.get<PaginatedAttendeesResponse>(
    `/events/${eventId}/attendees`,
    {
      params: { search: query, page, limit: 20 },
    }
  );
  return response.data;
};

/**
 * Realiza o check-in de um participante.
 */
export const checkInAttendee = async (
  eventId: string,
  attendeeId: string
): Promise<{ checkedInAt: string }> => {
  const response = await apiClient.post(`/events/${eventId}/checkin`, { attendeeId });
  return response.data;
};
