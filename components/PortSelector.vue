<script setup>

const props = defineProps(['connected'])

const { SerialPort } = require('serialport')

const ports = ref([])
const selectedPort = ref({})
const baudrateOptions = [110, 300, 600, 1200, 2400, 4800, 9600, 14400, 19200, 38400, 56000, 57600, 115200, 128000, 256000, 921600]
const selectedBaudrate = ref(9600)

onMounted(async () => {
    refreshPorts()
});

async function refreshPorts() {
    const list = await SerialPort.list()
    ports.value = list
    selectedPort.value = list[0]
    setTimeout(refreshPorts, 7500)
} 

</script>

<template>
    <div class="grid grid-cols-6 gap-2">
        <div class="sm:col-span-4 col-span-3">
            <USelectMenu v-model="selectedPort" :options="ports" option-attribute="path">
            </USelectMenu>
        </div>
        <div class="sm:col-span-2 col-span-3 flex gap-2">
            <div class="flex-1">
                <USelectMenu v-model="selectedBaudrate" :options="baudrateOptions" searchable creatable>
                    <template #option-create="{ option }">
                        <span class="flex-shrink-0">Use baudrate: {{ option.label }}</span>
                    </template>
                </USelectMenu>
            </div>
            <div class="flex-none">
                <UButton @click="$emit('toggleConnection', selectedPort, +selectedBaudrate || +selectedBaudrate.label)" :color="connected ? 'red': 'green'">{{ connected ? 'Disconnect' : 'Connect' }}</UButton>
            </div>
        </div>
    </div>
</template>