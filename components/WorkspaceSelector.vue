<script setup>

const view = useView()

const views = ref(view.listViews())
const selected = ref(view.getLastActiveView())
const renameModalisOpen = ref(false)
const renameModalValue = ref(view.current_view_name)

const options = [
  [
    {
      label: 'Workspace settings',
      disabled: true,
      slot: 'title'
    }
  ],
  [{
    label: 'Rename',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => {
      renameModalisOpen.value = true
    }
  }, 
  // {
  //   label: 'Duplicate',
  //   icon: 'i-heroicons-document-duplicate-20-solid',
  //   disabled: true
  // }
  ], [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    click: () => {
      view.deleteView(selected.value.id)
      views.value = view.listViews()
      selected.value = view.getLastActiveView()
    }
  }]
]

const labels = computed({
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

    views.value.push(newEntry)

    selected.value = newEntry
  }
})

onMounted(() => {
    view.switchTo(view.current_view.value)
});

function rename() {
  view.renameTo(renameModalValue.value)
  views.value = view.listViews()
  selected.value = {
    id: view.current_view_id,
    name: view.current_view_name
  }
  renameModalisOpen.value = false
}

</script>

<template>
  <div class="flex">
    <div class="w-64">
      <USelectMenu
        v-model="labels"
        by="id"
        :options="views"
        option-attribute="name"
        searchable
        creatable
        clear-search-on-close
        variant="none"
        
        searchablePlaceholder="Type to search or create a workspace"
      />
    </div>

  <UDropdown :items="options" :popper="{ placement: 'bottom-start' }" :ui="{ item: { disabled: 'cursor-default select-text' } }">
    <template #title="{ item }">
      <div>
        <p>
          Workspace settings
        </p>
      </div>
    </template>
    <UButton color="gray" square trailing-icon="i-heroicons-ellipsis-horizontal-16-solid" variant="link" />
  </UDropdown>

  <UModal v-model="renameModalisOpen">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Rename workspace
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
          </div>
        </template>

        <div class="flex gap-2">
          <UInput v-model="renameModalValue" placeholder="Workspace name" class="flex-1" autofocus="" />
          <UButton icon="i-heroicons-document" @click="rename">Save</UButton>
        </div>
      </UCard>
      
  </UModal>
  </div>
</template>