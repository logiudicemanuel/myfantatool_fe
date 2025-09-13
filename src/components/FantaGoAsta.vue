<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useBudgetStore } from '@/stores/budget.ts'

const br = useBudgetStore()

const ruoloMapping = {
  'por': 'P',
  'cen': 'C',
  'dif': 'D',
  'att': 'A'
}

function getColor(ruolo: string){
  return ruolo === 'P' ? 'bg-orange-400' : ruolo === 'D' ? 'bg-green-400' : ruolo === 'C' ? 'bg-blue-400' : 'bg-red-400'
}
function getBorderColor(ruolo: string){
  return ruolo === 'P' ? 'border-orange-400' : ruolo === 'D' ? 'border-green-400' : ruolo === 'C' ? 'border-blue-400' : 'border-red-400'
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
              <div class="w-[25%] flex flex-col gap-2">
                <div class="w-full flex justify-center items-center rounded-lg min-h-[50px] bg-gradient-to-r from-[#7c01ff]/20 to-[#30babf]/20 backdrop-blur-sm border-3" :class="getBorderColor(ruoloMapping[key])" v-for="(rep, key) in br.budgetReparto" :key="key">
                  <p class="italic font-semibold">{{ key === 'por' ? 'PORTIERI' : key === 'dif' ? 'DIFENSORI' : key === 'cen' ? 'CENTROCAMPISTI' : 'ATTACCANTI'}}</p>
                </div>
              </div>
              <div class="w-[75%] border border-green-200">reparto selezionato</div>
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
  </div>
</template>

<style scoped>

</style>
