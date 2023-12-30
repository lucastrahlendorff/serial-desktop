<template>
  <div id="app">
    <h1>Test</h1>
    <PortSelector></PortSelector>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { ipcRenderer } from 'electron'
import fs from 'node:fs'

onMounted(() => {
  console.log('ipcRenderer:',ipcRenderer)
  console.log('fs:', fs)
})
</script>

<style>

  #app {
    padding: 1em;
  }

</style>