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
export async function savePlayer(data:object) {
  if (!loggedIn.value) throw new Error('Non sei loggato');
  const res = await api.post('/items/giocatore', data);
  return res.data.data;
}
export async function saveAstaPlayer(data:object) {
  if (!loggedIn.value) throw new Error('Non sei loggato');
  const res = await api.post('/items/giocatoreasta', data);
  return res.data.data;
}
export async function getGiocatoriTitolari(sq: number) {
  if (!loggedIn.value) throw new Error('Non sei loggato');
  const res = await api.get(`/items/giocatore?filter[squadra][_eq]=${sq}&filter[impiego][_eq]=tit`);
  return res.data.data;
}
export async function getGiocatoriBallottaggio(sq: number) {
  if (!loggedIn.value) throw new Error('Non sei loggato');
  const res = await api.get(`/items/giocatore?filter[squadra][_eq]=${sq}&filter[impiego][_eq]=bal`);
  return res.data.data;
}
export async function getGiocatoreAsta(slot: string, ruolo: string) {
  if (!loggedIn.value) throw new Error('Non sei loggato');
  const res = await api.get(`/items/giocatoreasta?filter[slot][_eq]=${slot}&filter[ruolo][_eq]=${ruolo}`);
  return res.data.data;
}
export async function deleteGiocatore(id: number) {
  if (!loggedIn.value) throw new Error('Non sei loggato');
  const res = await api.delete(`/items/giocatore/${id}`);
  return res.data.data;
}
export async function deleteGiocatoreAsta(id: number) {
  if (!loggedIn.value) throw new Error('Non sei loggato');
  const res = await api.delete(`/items/giocatoreasta/${id}`);
  return res.data.data;
}

export default function useDirectus() {
  return { login, getSquadre, savePlayer, getGiocatoriTitolari, getGiocatoriBallottaggio, deleteGiocatore, getGiocatoreAsta, saveAstaPlayer, deleteGiocatoreAsta, token, loggedIn };
}
