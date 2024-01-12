<template>
    <div class="h-40 mt-4 rounded-md ring-1 px-2.5 py-1.5 ring-gray-700">
        <h5 class="font-bold">Monitor</h5>
        <p v-for="message in props.buffer">
        {{ message }}
        </p>
    </div>
</template>

<script setup>

const props = defineProps(['connected', 'buffer'])

</script>