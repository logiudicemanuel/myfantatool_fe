<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getSquadre } from '@/composable/useDirectus.ts'

interface Squadra {
  id: number
  nome: string,
  stemma: string,
}

const squadre = ref(<Squadra[]>([]))

onMounted(async () =>{
  squadre.value = await getSquadre()
})
</script>

<template>
  <div class="w-full h-[calc(100%-60px)] flex items-center justify-center text-gray-700">
    <div class="shadow-lg bg-white rounded-lg w-[90%] h-[90%] flex flex-col items-center">
      <h1 class="text-[32px] flex items-center justify-center pt-[10px] font-bold">SQUADRE SERIE A</h1>
      <p class="text-center italic text-gray-500 h-[40px]">Per ogni squadra puoi gestire i titolari e i ballottaggi.<br> Inoltre per ogni giocatore hai la possibilita' di inserire delle fantastatische utili da consultare durante l'asta.</p>
      <div class="gap-4 flex-wrap pt-[70px] flex items-center justify-center">
        <div class="border border-gray-400 w-[300px] h-[80px] rounded p-[10px] flex items-center hover:bg-blue-50 cursor-pointer" v-for="sq in squadre" :key="sq.id">
          {{ sq.nome }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
