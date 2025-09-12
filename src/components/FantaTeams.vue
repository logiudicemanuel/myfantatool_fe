<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  getSquadre,
  savePlayer,
  getGiocatoriTitolari,
  deleteGiocatore,
  getGiocatoriBallottaggio
} from '@/composable/useDirectus.ts'
import { Icon } from '@iconify/vue'

interface Squadra {
  id: number
  nome: string,
  stemma: string,
}

const squadre = ref(<Squadra[]>([]))

const sizeMapping = [
  { name: 'CAGLIARI', size: '40' },
  { name: 'COMO', size: '40' },
  { name: 'CREMONESE', size: '40' },
  { name: 'HELLAS VERONA', size: '40' },
  { name: 'INTER', size: '40' },
  { name: 'JUVENTUS', size: '20' },
  { name: 'LAZIO', size: '60' },
  { name: 'NAPOLI', size: '45' },
  { name: 'MILAN', size: '30' },
  { name: 'SASSUOLO', size: '40' },
  { name: 'UDINESE', size: '45' },
]

const ts = ref(<object>({}))
const playerTit = ref(<object[]>([{}]))
const playerBal = ref(<object[]>([{}]))
async function teamSelect(sq: Squadra) {
  ts.value = sq
  await loadTitPlayer(sq.id)
  await loadBalPlayer(sq.id)
}
async function loadTitPlayer(id_sq: number) {
  playerTit.value = await getGiocatoriTitolari(id_sq)
}
async function loadBalPlayer(id_sq: number) {
  playerBal.value = await getGiocatoriBallottaggio(id_sq)
}

const modal = ref(<boolean>(false))
const playerForm = ref(<object>({
  nome: '',
  xFMV: null,
  xPv: null,
  squadra: null,
  ruolo: null,
  impiego: null
}))
function openModal(impiego: string, sq: number) {
  modal.value = true
  playerForm.value.squadra = sq
  playerForm.value.impiego = impiego
}
async function save(){
  await savePlayer(playerForm.value)
  modal.value = false
  await loadTitPlayer(ts.value.id)
  await loadBalPlayer(ts.value.id)
}

function getColor(ruolo: string){
  return ruolo === 'P' ? 'bg-orange-400' : ruolo === 'D' ? 'bg-green-400' : ruolo === 'C' ? 'bg-blue-400' : 'bg-red-400'
}

async function deletePlayer(id: number){
  await deleteGiocatore(id)
  await loadTitPlayer(ts.value.id)
  await loadBalPlayer(ts.value.id)
}

onMounted(async () =>{
  squadre.value = await getSquadre()
})
</script>

<template>
  <div class="w-full h-[calc(100%-60px)] flex items-center justify-center text-gray-700">
    <div class="shadow-lg bg-white rounded-lg w-[90%] h-[90%] flex flex-col items-center">
      <h1 class="text-[32px] flex items-center justify-center pt-[10px] font-bold">SQUADRE SERIE A</h1>
      <p class="text-center italic text-gray-500 h-[40px] leading-5">Per ogni squadra puoi gestire i titolari e i ballottaggi.<br> Inoltre per ogni giocatore hai la possibilita' di inserire delle fantastatische utili da consultare durante l'asta.</p>
      <div v-if="!Object.keys(ts).length" class="gap-4 flex-wrap pt-[70px] flex items-center justify-center">
        <div class="border border-gray-400 w-[300px] h-[80px] rounded p-[10px] flex items-center hover:h-[90px] hover:w-[310px] hover:m-[-5px] cursor-pointer" v-for="sq in squadre" :key="sq.id" @click="teamSelect(sq)">
          <img alt="logo" :src="sq.stemma" :height="sizeMapping.find(x => x.name === sq.nome) ? sizeMapping.find(x => x.name === sq.nome)?.size : 35" :width="sizeMapping.find(x => x.name === sq.nome) ? sizeMapping.find(x => x.name === sq.nome)?.size : 35" class="mx-[30px]"/>
          <p class="font-semibold text-[22px]">{{ sq.nome }}</p>
        </div>
      </div>
      <div v-else class="flex flex-col items-center justify-center pt-[20px] w-full h-full">
        <p class="text-[26px] font-semibold text-gray-700 flex items-center">
          <Icon icon="mdi:arrow-back-circle" width="30" height="30" class="mr-[5px] cursor-pointer" @click="ts = {}"/>
          {{ts.nome}}
        </p>
        <div class="flex items-center justify-center gap-4 w-full h-full">
          <div class="w-[25%] min-w-[300px] h-[calc(100%-50px)] border rounded-lg border-gray-300 flex flex-col items-center">
            <div class="flex items-center">
              <p class="text-center pt-[5px] text-[18px] font-semibold mr-[5px]">TITOLARI</p>
              <el-button type="success" size="small" :disabled="playerTit.length > 2" circle class="mt-[3px]" @click="openModal('tit', ts.id)">
                <Icon icon="mdi:plus" height="18"></Icon>
              </el-button>
            </div>
            <div class="flex items-center justify-between rounded border border-gray-200 gap-4 w-[95%] mx-2 mt-2 px-2" v-for="player in playerTit" :key="player.id">
              <div class="flex items-center">
                <div class="h-[18px] w-[18px] rounded-full flex justify-center items-center text-[11px] text-white mr-2" :class="[getColor(player.ruolo)]">{{player.ruolo}}</div>
                {{player.nome}}
              </div>
              <div class="flex items-center text-[12px]">
                xFMV: {{player.xFMV}}
                xPv: {{player.xPv}}
                <Icon icon="mdi:trash" height="15" width="15" class="ml-2 cursor-pointer" @click="deletePlayer(player.id)"></Icon>
              </div>
            </div>
          </div>
          <div class="w-[25%] min-w-[300px] h-[calc(100%-50px)] border rounded-lg border-gray-300 flex flex-col items-center">
            <div class="flex items-center">
              <p class="text-center pt-[5px] text-[18px] font-semibold mr-[5px]">BALLOTTAGGI</p>
              <el-button type="warning" size="small" circle class="mt-[3px]" @click="openModal('bal', ts.id)">
                <Icon icon="mdi:plus" height="18"></Icon>
              </el-button>
            </div>
            <div class="flex items-center justify-between rounded border border-gray-200 gap-4 w-[95%] mx-2 mt-2 px-2" v-for="player in playerBal" :key="player.id">
              <div class="flex items-center">
                <div class="h-[18px] w-[18px] rounded-full flex justify-center items-center text-[11px] text-white mr-2" :class="[getColor(player.ruolo)]">{{player.ruolo}}</div>
                {{player.nome}}
              </div>
              <div class="flex items-center text-[12px]">
                xFMV: {{player.xFMV}}
                xPv: {{player.xPv}}
                <Icon icon="mdi:trash" height="15" width="15" class="ml-2 cursor-pointer" @click="deletePlayer(player.id)"></Icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog v-model="modal" title="Giocatore">
      <template #default>
        <div>
          <el-form :model="playerForm" label-width="auto" style="max-width: 600px">
            <el-form-item label="Nome">
              <el-input v-model="playerForm.nome"></el-input>
            </el-form-item>
            <el-form-item label="xFMV">
              <el-input type="number" v-model="playerForm.xFMV"></el-input>
            </el-form-item>
            <el-form-item label="xPv">
              <el-input type="number" v-model="playerForm.xPv"></el-input>
            </el-form-item>
            <el-form-item label="Ruolo">
              <el-select v-model="playerForm.ruolo"
                         :options="[
                           { value: 'P', label: 'Portiere' },
                           { value: 'D', label: 'Difensore' },
                           { value: 'C', label: 'Centrocampista' },
                           { value: 'A', label: 'Attaccante' },
                         ]"
              ></el-select>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template #footer>
        <div class="flex items-center justify-end">
          <el-button @click="modal = false">Annulla</el-button>
          <el-button type="primary" @click="save">Salva</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>

</style>
