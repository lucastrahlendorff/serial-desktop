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

const viewSlider = ref(false)
const min = ref()
const max = ref()
const step = ref()
const valueOff = ref(0)
const valueOn = ref(1)
const valueBoolean = ref(false)

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
                <div v-if="viewOptions" class="mt-2">
                    <UCheckbox v-model="viewSlider" label="Slider" />
                    <div v-if="viewSlider" class="flex items-center gap-2 mt-2">
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
            </div>
            <div v-else-if="type === 'toggle'">
                <UToggle :model-value="valueBoolean" @update:model-value="(newValue) => { valueBoolean = newValue; sendData() }" />
                <div v-if="viewOptions" class="flex items-center mt-2 gap-2">
                    Off: 
                    <UInput v-model="valueOff" placeholder="Value Off"/>
                    On:
                    <UInput v-model="valueOn" placeholder="Value On"/>
                </div>
            </div>
            <div v-else>
                Unknown type
            </div>
            <div v-if="viewOptions" class="flex items-center mt-2 gap-2">
                Type: 
                <USelectMenu v-model="type" :options="types" class="flex-1" />
            </div>
        </div>

        <UButton
            :icon="viewOptions ? 'i-heroicons-check' : 'i-heroicons-pencil-square'"
            size="sm"
            square
            variant="link"
            @click="viewOptions = !viewOptions"
        />
        
        <UButton color="gray" @click="sendData" :disabled="!serial.connected.value">Send</UButton>

    </div>
</template>