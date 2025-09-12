<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <div id="fanta-home" class="w-full h-[calc(100%-60px)] text-gray-700">
    <div class="w-full h-full flex flex-col justify-center items-center">
      <p class="text-[52px] mt-[-150px]">Ciao <b>MANUEL!</b></p>
      <p class="text-[22px] pt-2">Benvenuto nel tuo sistema di gestione dell'asta personale.</p>
      <div class="flex items-center gap-4 pt-12">
        <div class="h-[200px] w-[220px] px-3 bg-gradient-to-r from-white/0 to-white/5 backdrop-blur-lg border border-white/20 rounded flex flex-col justify-center items-center">
          <div class="h-[50px] w-[50px] rounded bg-blue-300 flex justify-center items-center">
            <Icon icon="mdi:settings" width="30" height="30" />
          </div>
          <p class="pt-[10px] text-[16px] font-semibold">Gestione avanzata</p>
          <p class="pt-[10px] text-center text-[14px]">Gestisci titolari e ballottaggi per ogni squadra.</p>
        </div>
        <div class="h-[200px] w-[220px] px-3 bg-gradient-to-r from-white/0 to-white/5 backdrop-blur-lg border border-white/20 rounded flex flex-col justify-center items-center">
          <div class="h-[50px] w-[50px] rounded bg-pink-300 flex justify-center items-center">
            <Icon icon="mdi:broadcast" width="30" height="30" />
          </div>
          <p class="pt-[10px] text-[16px] font-semibold">Asta in tempo reale</p>
          <p class="pt-[10px] text-center text-[14px]">Crea live la tua squadra e controlla cosa fanno gli altri.</p>
        </div>
        <div class="h-[200px] w-[220px] px-3 bg-gradient-to-r from-white/0 to-white/5 backdrop-blur-lg border border-white/20 rounded flex flex-col justify-center items-center">
          <div class="h-[50px] w-[50px] rounded bg-purple-300 flex justify-center items-center">
            <Icon icon="mdi:strategy" width="30" height="30" />
          </div>
          <p class="pt-[10px] text-[16px] font-semibold">Strategia vincente</p>
          <p class="pt-[10px] text-center text-[14px]">Salvati le statistiche utili per ogni giocatore.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
