<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useBudgetStore } from '@/stores/budget.ts'
import { ref } from 'vue'
import { deleteGiocatoreAsta, getGiocatoreAsta, saveAstaPlayer } from '@/composable/useDirectus.ts'

const modal = ref(<boolean>false)
const br = useBudgetStore()

const primoSlot = ref(<object[]>([{}]))
const secondoSlot = ref(<object[]>([{}]))
const terzoSlot = ref(<object[]>([{}]))
const altroSlot = ref(<object[]>([{}]))

const ruoloMapping = {
  'por': 'P',
  'cen': 'C',
  'dif': 'D',
  'att': 'A'
}

type Reparto = 'por' | 'dif' | 'cen' | 'att'
const repartoSelected = ref(<Reparto>(''))

function getColor(ruolo: string){
  return ruolo === 'P' ? 'bg-orange-400' : ruolo === 'D' ? 'bg-green-400' : ruolo === 'C' ? 'bg-blue-400' : 'bg-red-400'
}
function getBorderColor(ruolo: string){
  return ruolo === 'P' ? 'border-orange-400' : ruolo === 'D' ? 'border-green-400' : ruolo === 'C' ? 'border-blue-400' : 'border-red-400'
}

const playerForm = ref(<object>({
  nome: '',
  ruolo: null,
  slot: null
}))
function openModal(slot: string) {
  modal.value = true
  playerForm.value.ruolo = ruoloMapping[repartoSelected.value]
  playerForm.value.slot = slot
}
async function save(){
  await saveAstaPlayer(playerForm.value)
  modal.value = false
  if(playerForm.value.slot === '1s'){
    primoSlot.value = await getGiocatoreAsta(playerForm.value.slot, playerForm.value.ruolo)
  }
  if(playerForm.value.slot === '2s'){
    secondoSlot.value = await getGiocatoreAsta(playerForm.value.slot, playerForm.value.ruolo)
  }
  if(playerForm.value.slot === '3s'){
    terzoSlot.value = await getGiocatoreAsta(playerForm.value.slot, playerForm.value.ruolo)
  }
  if(playerForm.value.slot === 'altro'){
    altroSlot.value = await getGiocatoreAsta(playerForm.value.slot, playerForm.value.ruolo)
  }
  playerForm.value = {
    nome: '',
    ruolo: null,
    slot: null
  }
}
async function deletePlayer(id: number, slot: string){
  await deleteGiocatoreAsta(id)
  if(slot === '1s'){
    primoSlot.value = await getGiocatoreAsta(slot, ruoloMapping[repartoSelected.value])
  }
  if(slot === '2s'){
    secondoSlot.value = await getGiocatoreAsta(slot, ruoloMapping[repartoSelected.value])
  }
  if(slot === '3s'){
    terzoSlot.value = await getGiocatoreAsta(slot, ruoloMapping[repartoSelected.value])
  }
  if(slot === 'altro'){
    altroSlot.value = await getGiocatoreAsta(slot, ruoloMapping[repartoSelected.value])
  }
}

async function selectedReparto(ruolo: Reparto) {
  repartoSelected.value = ruolo
  primoSlot.value = await getGiocatoreAsta('1s', ruoloMapping[repartoSelected.value])
  secondoSlot.value = await getGiocatoreAsta('2s', ruoloMapping[repartoSelected.value])
  terzoSlot.value = await getGiocatoreAsta('3s', ruoloMapping[repartoSelected.value])
  altroSlot.value = await getGiocatoreAsta('altro', ruoloMapping[repartoSelected.value])
}
</script>

<template>
  <div class="w-full !min-h-[calc(100%-60px)] flex items-center justify-center text-gray-700 py-[30px]">
    <div class="shadow-lg bg-gradient-to-r from-white/0 to-white/5 backdrop-blur rounded-lg w-[90%] min-h-[815px] flex flex-col items-center">
      <h1 class="text-[32px] flex items-center justify-center pt-[10px] font-bold">
        <Icon icon="mdi:gavel" width="34" height="34" class="mr-2" />
        GO ASTA!
      </h1>
      <p class="text-center italic text-gray-500 h-[40px] leading-5">
        Qui puoi gestire dinamicamente la tua asta! <br> Puoi creare la tua suddivisione slot per reparto, con relativo budget dinamico, e controllare la situazione dei tuoi avversari.
      </p>
      <div class="w-[95%] rounded-lg bg-white flex flex-col items-center my-[15px] text-gray-700">
        <div class="text-[22px] flex items-center justify-center pt-[5px] font-semibold">
          Suddivisione Slot
        </div>
        <div class="w-full flex min-h-[50px]">
          <div class="w-[20%] border-r border-r-gray-300 p-4 flex flex-col">
            <p class="text-[16px] font-semibold">Gestione budget</p>
            <div class="text-[14px] flex flex-col">
              Totale crediti: <el-input type="number" v-model="br.total"></el-input>
            </div>
            <div class="text-[14px] flex items-center pt-2">
              <div class="h-[18px] w-[18px] rounded-full flex justify-center items-center text-[11px] text-white mr-1" :class="[getColor('P')]">P</div>
              Portieri:
              <el-input type="number" v-model="br.por" class="!w-[80px] ml-1"></el-input>% = {{ br.getTotalReparto(br.por, 'por') }}cr
            </div>
            <div class="text-[14px] flex items-center pt-2">
              <div class="h-[18px] w-[18px] rounded-full flex justify-center items-center text-[11px] text-white mr-1" :class="[getColor('D')]">D</div>
              Difensori:
              <el-input type="number" v-model="br.dif" class="!w-[80px] ml-1"></el-input>% = {{ br.getTotalReparto(br.dif, 'dif') }}cr
            </div>
            <div class="text-[14px] flex items-center pt-2">
              <div class="h-[18px] w-[18px] rounded-full flex justify-center items-center text-[11px] text-white mr-1" :class="[getColor('C')]">C</div>
              Centrocampisti:
              <el-input type="number" v-model="br.cen" class="!w-[80px] ml-1"></el-input>% = {{ br.getTotalReparto(br.cen, 'cen') }}cr
            </div>
            <div class="text-[14px] flex items-center pt-2">
              <div class="h-[18px] w-[18px] rounded-full flex justify-center items-center text-[11px] text-white mr-1" :class="[getColor('A')]">A</div>
              Attaccanti:
              <el-input type="number" v-model="br.att" class="!w-[80px] ml-1"></el-input>% = {{ br.getTotalReparto(br.att, 'att') }}cr
            </div>
          </div>
          <div class="w-[80%] p-4 flex flex-col">
            <p class="text-[16px] font-semibold">Reparti</p>
            <div class="w-full flex items-center">
              <div class="w-[15%] flex flex-col gap-2">
                <div class="w-full flex justify-center items-center rounded-lg min-h-[50px] bg-gradient-to-r from-[#7c01ff]/20 to-[#30babf]/20 backdrop-blur-sm border-3 cursor-pointer" :class="getBorderColor(ruoloMapping[key])" v-for="(rep, key) in br.budgetReparto" :key="key" @click="selectedReparto(key)">
                  <p class="italic font-semibold">{{ key === 'por' ? 'PORTIERI' : key === 'dif' ? 'DIFENSORI' : key === 'cen' ? 'CENTROCAMPISTI' : 'ATTACCANTI'}}</p>
                </div>
              </div>
              <div v-if="repartoSelected" class="w-[85%] h-full flex items-center px-4">
                <div class="w-[20%] h-full border border-gray-200 flex flex-col">
                  <div class="bg-orange-300 text-center font-semibold">
                    1 SLOT
                    <el-button type="success" size="small" class="!h-[16px] !w-[16px] mt-[-2px]" circle @click="openModal('1s')">
                      <Icon icon="mdi:plus" height="16"></Icon>
                    </el-button>
                  </div>
                  <div class="border flex items-center justify-between rounded-lg border-gray-200 mx-1 mt-1" v-for="player in primoSlot" :key="player.id">
                    <p class="px-2">{{player.nome}}</p>
                    <Icon icon="mdi:trash" height="15" width="15" class="mr-2 cursor-pointer" @click="deletePlayer(player.id, player.slot)"></Icon>
                  </div>
                </div>
                <div class="w-[20%] h-full border border-gray-200">
                  <div class="bg-orange-300 text-center font-semibold">
                    2 SLOT
                    <el-button type="success" size="small" class="!h-[16px] !w-[16px] mt-[-2px]" circle>
                      <Icon icon="mdi:plus" height="16"></Icon>
                    </el-button>
                  </div>
                </div>
                <div class="w-[20%] h-full border border-gray-200">
                  <div class="bg-orange-300 text-center font-semibold">
                    3/4 SLOT
                    <el-button type="success" size="small" class="!h-[16px] !w-[16px] mt-[-2px]" circle>
                      <Icon icon="mdi:plus" height="16"></Icon>
                    </el-button>
                  </div>
                </div>
                <div class="w-[20%] h-full border border-gray-200">
                  <div class="bg-orange-300 text-center font-semibold">
                    ALTRO
                    <el-button type="success" size="small" class="!h-[16px] !w-[16px] mt-[-2px]" circle>
                      <Icon icon="mdi:plus" height="16"></Icon>
                    </el-button>
                  </div>
                </div>
                <div class="w-[20%] h-full border border-gray-200">
                  <div class="bg-purple-200 text-center font-semibold">BUDGET SLOT</div>
                  <div>Totale reparto: {{ br.budgetReparto[repartoSelected] }}</div>
                </div>
              </div>
              <div v-else class="w-[85%] h-full flex items-center justify-center px-4 italic text-gray-400">
                Seleziona un reparto per visualizzare gli slot corrispondenti.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-[95%] rounded-full bg-white flex flex-col items-center text-gray-700">
        <div class="text-[20px] flex items-center justify-center pt-[5px] font-semibold">
          Situazione Rose
        </div>
      </div>
    </div>
    <el-dialog v-model="modal" title="Giocatore" width="400">
      <template #default>
        <div>
          <el-form :model="playerForm" label-width="auto" style="max-width: 600px">
            <el-form-item label="Nome">
              <el-input v-model="playerForm.nome"></el-input>
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
