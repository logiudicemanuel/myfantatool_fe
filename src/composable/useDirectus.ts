// src/composables/useDirectus.ts
import axios from 'axios';
import { ref } from 'vue';

const API_BASE = 'http://localhost:8055';

const api = axios.create({ baseURL: API_BASE });
const token = ref<string | null>(null);
const loggedIn = ref(false);

export async function login(email: string, password: string) {
  if (loggedIn.value) return; // evita login multipli
  const res = await api.post('/auth/login', { email, password });
  token.value = res.data.data.access_token;
  api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
  loggedIn.value = true;
}

// Funzioni API
export async function getSquadre() {
  if (!loggedIn.value) throw new Error('Non sei loggato');
  const res = await api.get('/items/squadre');
  return res.data.data;
}

export default function useDirectus() {
  return { login, getSquadre, token, loggedIn };
}
