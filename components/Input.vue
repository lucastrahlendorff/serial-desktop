<script setup>

const props = defineProps(['connected', 'name', 'value', 'type', 'options'])

const emit = defineEmits(['setVar'])

const name = ref(props.name)
const value = ref(props.value)
const type = ref(props.type)

const viewOptions = ref(false)

const viewSlider = ref(false)
const min = ref()
const max = ref()
const step = ref()

const valueOff = ref(0)
const valueOn = ref(1)
const valueBoolean = ref(false)

function sendData() {
    switch (type.value) {
        case 'boolean':
            emit('setVar', name.value, valueBoolean.value ? valueOn.value : valueOff.value)
            break
    
        default:
            emit('setVar', name.value, value.value)
            break
    }
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
                        Min:
                        <UInput v-model="min" type="number" placeholder="0"/>
                        Max:
                        <UInput v-model="max" type="number" placeholder="100"/>
                        Step:
                        <UInput v-model="step" type="number" placeholder="1"/>
                    </div>
                </div>
            </div>
            <div v-else-if="type === 'boolean'">
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
        </div>

        <UButton
            :icon="viewOptions ? 'i-heroicons-check' : 'i-heroicons-pencil-square'"
            size="sm"
            square
            variant="link"
            @click="viewOptions = !viewOptions"
        />
        
        <UButton color="gray" @click="sendData" :disabled="!props.connected">Send</UButton>

    </div>
</template>