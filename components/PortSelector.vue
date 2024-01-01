<script setup>

const props = defineProps(['connected'])

const { SerialPort } = require('serialport')

const ports = ref([])
const selectedPort = ref({})
const baudrateOptions = [110, 300, 600, 1200, 2400, 4800, 9600, 14400, 19200, 38400, 56000, 57600, 115200, 128000, 256000]
const selectedBaudrate = ref(9600)

onMounted(async () => {
    const list = await SerialPort.list()
    console.log(list);
    ports.value = list
    selectedPort.value = list[0]
});

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
                <UButton @click="$emit('toggleConnection', selectedPort, selectedBaudrate)" :color="connected ? 'red': 'green'">{{ connected ? 'Trennen' : 'Verbinden' }}</UButton>
            </div>
        </div>
    </div>
</template>