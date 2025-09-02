// src/types/api.ts
// Define as interfaces TypeScript para as respostas da API.

export interface EventStats {
  total: number;
  checkedIn: number;
  absent: number;
}

export interface Event {
  id: string;
  title: string;
  startsAt: string;
  endsAt: string;
  location: string;
  stats: EventStats;
}

export interface Attendee {
  id: string;
  name: string;
  email: string;
  document: string;
  checkedInAt: string | null;
}

export interface PaginatedAttendeesResponse {
  data: Attendee[];
  page: number;
  limit: number;
  total: number;
}
