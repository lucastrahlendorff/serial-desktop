<script setup>

const props = defineProps(['id', 'options'])

const emit = defineEmits(['setVar'])

const types = ['text', 'number', 'toggle']

const view = useView()
const serial = useSerial()

const name = ref(props.options.name)
const value = ref(props.options.value)
const type = ref(props.options.type)

const viewOptions = ref(false)

const viewSlider = ref(props.options.viewSlider || false)
const min = ref(props.options.min || 0)
const max = ref(props.options.max || 100)
const step = ref(props.options.step || 1)
const valueOff = ref(props.options.valueOff || 0)
const valueOn = ref(props.options.valueOn || 1)
const valueBoolean = ref(props.options.valueBoolean || false)

const propertiesToSave = ['name', 'type', 'value', 'viewSlider', 'min', 'max', 'step', 'valueOff', 'valueOn', 'valueBoolean'];

propertiesToSave.forEach(property => {
    watch(eval(property), (newValue) => {
        view.setInputOption(props.id, property, newValue);
    });
});

function sendData() {
    switch (type.value) {
        case 'toggle':
            value.value = valueBoolean.value ? valueOn.value : valueOff.value
            break
    }
    serial.setVar(name.value, value.value)
}

</script>

<template>
    <div class="flex gap-2 items-center py-2">
        <UInput v-model="name" placeholder="Variable name" variant="none" class="flex-1"/>
        
        <div class="flex-1">
            <div v-if="type === 'text'">
                <UInput v-model="value" placeholder="Value" @keyup.enter="sendData"/>
            </div>
            <div v-else-if="type === 'number'">
                <UInput v-if="!viewSlider" v-model="value" type="number" placeholder="Value" @keyup.enter="sendData"/>
                <div v-else class="">
                    <div class="w-10 ml-1">
                        {{ value }}
                    </div>
                    <URange v-model="value" :min="min" :max="max" :step="step" @change="sendData"/>
                </div>
            </div>
            <div v-else-if="type === 'toggle'">
                <UToggle :model-value="valueBoolean" @update:model-value="(newValue) => { valueBoolean = newValue; sendData() }" />
            </div>
            <div v-else>
                Unknown type
            </div>
        </div>

        <UButton
            icon="i-heroicons-pencil-square"
            size="sm"
            square
            variant="link"
            @click="viewOptions = !viewOptions"
        />

        <UModal v-model="viewOptions" :ui="{ base: 'overflow-visible'}">
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800', overflow: 'visible' }">
                
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Edit input
                        </h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="viewOptions = false" />
                    </div>
                </template>

                <div class="flex items-center mb-2 gap-2">
                    Name: 
                    <UInput v-model="name" placeholder="Variable name" class="flex-1"/>
                </div>

                <div class="flex items-center mb-2 gap-2">
                    Type: 
                    <USelectMenu v-model="type" :options="types" class="flex-1" />
                </div>

                <!-- Number -->
                <div v-if="type === 'number'">
                    <UCheckbox v-model="viewSlider" label="Slider" />
                    <div v-if="viewSlider" class="flex items-center gap-2 mt-1">
                        <div>
                            Min:
                            <UInput v-model="min" type="number" placeholder="0"/>
                        </div>
                        <div>
                            Max:
                            <UInput v-model="max" type="number" placeholder="100"/>
                        </div>
                        <div>
                            Step:
                            <UInput v-model="step" type="number" placeholder="1"/>
                        </div>
                    </div>
                </div>
                <!-- Toggle -->
                <div v-else-if="type === 'toggle'">
                    <div class="flex items-center gap-2">
                        Value Off: 
                        <UInput v-model="valueOff" placeholder="Value Off" class="flex-1"/>
                        Value On:
                        <UInput v-model="valueOn" placeholder="Value On" class="flex-1"/>
                    </div>
                </div>

                <template #footer>
                    <div class="flex justify-between pb-2">
                        <UButton color="red" variant="outline" icon="i-heroicons-trash" @click="view.deleteInput(props.id); viewOptions = false">Delete</UButton>
                        <UButton icon="i-heroicons-check" @click="viewOptions = false">Close</UButton>
                    </div>
                </template>
                
            </UCard>
        </UModal>
        
        <UButton color="gray" @click="sendData" :disabled="!serial.connected.value">Send</UButton>

    </div>
</template>