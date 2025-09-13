import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useBudgetStore = defineStore('budget', () => {
  const total = ref(<number>(0))
  const por = ref(<number>(0))
  const dif = ref(<number>(0))
  const cen = ref(<number>(0))
  const att = ref(<number>(0))

  type Reparto = 'por' | 'dif' | 'cen' | 'att'

  const budgetReparto = ref<Record<Reparto, number>>({
    por: 0,
    dif: 0,
    cen: 0,
    att: 0,
  })

  function getTotalReparto(perc: number, reparto: Reparto) {
    budgetReparto.value[reparto] = (perc / 100) * total.value
    return budgetReparto.value[reparto]
  }

  return { total, por, dif, cen, att, budgetReparto, getTotalReparto }
})
