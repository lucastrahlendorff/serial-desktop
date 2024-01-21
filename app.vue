<script setup>
import fs from 'node:fs'

const view = useView()

</script>

<template>
  <div id="app" class="flex flex-col h-lvh gap-4 p-4">

    <div class="flex gap-2">
      <WorkspaceSelector></WorkspaceSelector>
      <PortSelector class="flex-1"></PortSelector>
    </div>

      <UCard class="flex-1 overflow-y-auto">
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
            >Add Variable</UButton>
          </div>
        </div>
        
      </UCard>

    <div>
      <Monitor></Monitor>
    </div>
    
  </div>
</template>

<style>
  body {
    @apply dark:bg-gray-900;
    height: 100%;
  }

  /* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(var(--color-gray-800));
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(var(--color-gray-700));
}
</style>