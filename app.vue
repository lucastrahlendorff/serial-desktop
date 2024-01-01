<template>
  <div id="app">
    <PortSelector :connected="connected" @toggle-connection="toggleConnection"></PortSelector>
  </div>
</template>

<script setup>
import fs from 'node:fs'

const { SerialPort } = require('serialport')

const connected = ref(false)

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
              return console.log('Error: ', err.message)
          } else {
            console.log("Connected.")
            connected.value = true
          }
      })
      
  }
}

</script>

<style>

  #app {
    padding: 1em;
  }

</style>