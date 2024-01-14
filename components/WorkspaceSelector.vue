<script setup>

const view = useView()

let options = ref(view.listViews())
let selected = ref(options.value[0])


let labels = computed({
  get: () => selected.value,
  set: async (label) => {
    if (label.id) {
      selected.value = label
      view.switchTo(label.id)
      return
    }

    let id = view.createView(label.name)

    let newEntry = {
      id,
      name: label.name
    }

    options.value.push(newEntry)

    selected.value = newEntry
  }
})

onMounted(() => {
    view.switchTo(options.value[0].id)
});
</script>

<template>
  <USelectMenu
    v-model="labels"
    by="id"
    :options="options"
    option-attribute="name"
    searchable
    creatable
    clear-search-on-close
    variant="none"
    class="w-64"
  />
</template>