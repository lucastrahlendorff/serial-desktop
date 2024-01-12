<template>
  <div id="app">
    <PortSelector :connected="connected" @toggle-connection="toggleConnection"></PortSelector>
    <Monitor></Monitor>
  </div>
</template>

<script setup>
import fs from 'node:fs'

const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

const connected = ref(false)
const buffer = ref(["", "", "", "", ""])

function toggleConnection(port, baudRate) {
  console.log("To: ", port, baudRate)
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
          window.parser = window.connection.pipe(new ReadlineParser({ delimiter: '\r\n' }))
          window.parser.on('data', handleData)
          window.connection.write('test:1', function(err) {
            if (err) {
              return console.log('Error on write: ', err.message)
            }
            console.log('message written')
          })
        }
    })
  }
}

function handleData(newData) {
  let list = buffer.value
  list.push(newData)
  list.shift()
  buffer.value = list
}

</script>

<style>

  #app {
    padding: 1em;
  }

</style>