<script setup>

const serial = useSerial()

const ports = ref([])
const selectedPort = ref({})
const baudrateOptions = [110, 300, 600, 1200, 2400, 4800, 9600, 14400, 19200, 38400, 56000, 57600, 115200, 128000, 256000, 921600]
const selectedBaudrate = ref(9600)

onMounted(async () => {
    refreshPorts()
});

async function refreshPorts() {
    const list = await serial.getPorts()
    ports.value = list
    selectedPort.value = list[0]
    setTimeout(refreshPorts, 7500)
} 

</script>

<template>
    <div class="flex gap-2">
        <div class="flex-1">
            <USelectMenu v-model="selectedPort" :options="ports" option-attribute="path">
            </USelectMenu>
        </div>
        <div class="flex gap-2">
            <div class="w-32">
                <USelectMenu v-model="selectedBaudrate" :options="baudrateOptions" searchable creatable>
                    <template #option-create="{ option }">
                        <span class="flex-shrink-0">Use baudrate: {{ option.label }}</span>
                    </template>
                </USelectMenu>
            </div>
            <div class="flex-none">
                <UButton @click="serial.toggleConnection(selectedPort, +selectedBaudrate || +selectedBaudrate.label)" :color="serial.connected.value ? 'red': 'green'">{{ serial.connected.value ? 'Disconnect' : 'Connect' }}</UButton>
            </div>
        </div>
    </div>
</template>