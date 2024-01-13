<script setup>
import fs from 'node:fs'

const view = useView()

</script>

<template>
  <div id="app">
    <PortSelector></PortSelector>
    <UCard class="mt-4">
      <div class="flex flex-col divide-y divide-slate-700">
        <Input v-for="[id, element] in view.inputElements.value" :id="id" :options="element"></Input>
        <div>
          <UButton
            class="mt-4"
            icon="i-heroicons-plus"
            size="sm"
            block
            variant="link"
            @click="view.addInput"
          >Add input</UButton>
        </div>
      </div>
      
    </UCard>
    <Monitor></Monitor>
    {{ view.inputElements }}
  </div>
</template>

<style>

  body {
    @apply dark:bg-gray-900;
  }

  #app {
    padding: 1em;
  }

</style>