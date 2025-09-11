<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div id="fanta-index" class="w-full h-full">
    <div class="w-full h-[60px] flex items-center justify-between px-4 border-b shadow-sm border-gray-200">
      <div class="h-[44px] mt-[-5px] cursor-pointer" @click="router.push({name: 'index'})">
        <img src="../src/assets/icon/logo2.png" alt="logo" />
      </div>
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-2 cursor-pointer rounded py-1 px-2 hover:bg-gray-100" @click="router.push({name: 'teams'})">
          <Icon icon="mdi:users-group" width="18" height="18" />
          <p class="text-[16px] font-semibold">Squadre</p>
        </div>
        <div class="flex items-center gap-2 border rounded border-gray-400 p-1 hover:bg-gray-700 hover:text-white hover:cursor-pointer" @click="router.push({name: 'goasta'})">
          <Icon icon="mdi:gavel" width="18" height="18" />
          <p class="text-[16px] font-semibold">GoAsta!</p>
        </div>
      </div>
    </div>
    <router-view class="bg-gradient-to-r from-[#7c01ff]/20 to-[#30babf]/20 backdrop-blur-sm"></router-view>
  </div>
</template>

<style>
html {
  height: 100%;
}

body {
  height: 100%;
}

#app {
  height: 100%;
}
</style>
