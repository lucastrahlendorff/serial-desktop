<script setup>
import fs from 'node:fs'

const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

const connected = ref(false)
const buffer = ref(["", "", "", "", ""])
const inputs = ref([{ id: '1', name: 'debug', type: 'boolean' }])

function toggleConnection(port, baudRate) {
  let path = port.path
  if (connected.value) {
      window.connection.close()
      connected.value = false
      console.log("Disconnected.")
  } else {
    console.log("connecting...")
    window.connection = new SerialPort({ path, baudRate }, function (err) {
        if (err) {
            return console.error('Error: ', err.message)
        } else {
          console.log("Connected.")
          connected.value = true
          window.parser = window.connection.pipe(new ReadlineParser({ delimiter: '\r\n' }))
          window.parser.on('data', handleData)
        }
    })
  }
}

function handleData(newData) {
  console.log(newData)
  let list = buffer.value
  list.push(newData)
  list.shift()
  buffer.value = list
}

function writeSerial(data) {
  if (connected) {
    window.connection.write(data, function(err) {
      if (err) {
        return console.error('Error on write: ', err.message)
      }
      console.log('message written')
    })
  } else {
    console.info('message not written: no connection')
  }
}

function setVar(name, value) {
  console.log(name, value)
  writeSerial(name + ":" + value)
}

</script>

<template>
  <div id="app">
    <PortSelector :connected="connected" @toggle-connection="toggleConnection"></PortSelector>
    <UCard class="mt-4">
      <div class="flex flex-col divide-y divide-slate-700">
        <Input v-for="element in inputs" @set-var="setVar" :connected="connected" :name="element.name" :type="element.type"></Input>
        <div>
          <UButton
            class="pt-2"
            icon="i-heroicons-plus"
            size="sm"
            block
            variant="link"
            @click=""
          >Add input</UButton>
        </div>
      </div>
      
    </UCard>
    <Monitor :buffer="buffer"></Monitor>
    {{ inputs }}
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