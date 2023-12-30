<script setup>

const { SerialPort } = require('serialport')

const ports = ref(await SerialPort.list())
const selected = ref(ports[0])

</script>

<template>
    <USelectMenu v-model="selected" :options="ports" option-attribute="path">
    </USelectMenu>
</template>