const Store = require('electron-store')

const store = new Store()
const inputElements = ref(new Map())
const current_view = ref("")
const current_view_name = ref("")

export function useView() {

    function addInput() {
        let id = crypto.randomUUID()
        inputElements.value.set(id, { name: '', type: 'text' })
        saveView()
    }

    function deleteInput(id) {
        let filtered = new Map([...inputElements.value.entries()].filter(([key]) => key !== id));
        inputElements.value = new Map();
        nextTick(() => {
            inputElements.value = filtered
        });
        saveView()
    }

    function setInputOption(id, key, value) {
        let inputElement = inputElements.value.get(id)
        if (inputElement) {
            inputElement[key] = value
            inputElements.value.set(id, inputElement)
        }
        saveView()
    }

    function saveView() {
        store.set('view.'+current_view.value+".elements", Object.fromEntries(inputElements.value))
    }

    function renameTo(name) {
        current_view_name.value = name
        store.set('view.'+current_view.value+".name", name)
    }

    function switchTo(id) {
        console.log("Switching to view", id)
        current_view.value = id
        let view_ = store.get("view."+id)
        current_view_name.value = view_.name
        store.set('active_view', id)
        inputElements.value = new Map()
        nextTick(() => {
            inputElements.value = new Map(Object.entries(view_.elements))
        });
    }
    
    function createView(name) {
        let id = crypto.randomUUID()
        current_view.value = id
        store.set("view."+id, { name, elements: {} })
        inputElements.value = new Map()
        return id
    }

    function deleteView(id) {
        store.delete("view."+id)
        switchTo(listViews()[0].id)
    }

    function listViews() {
        let views = store.get("view");
        if (!views) {
            createView("Default Workspace")
            return listViews()
        }
        return Object.keys(views).map(id => ({ id, name: views[id].name }));
    }

    function getLastActiveView() {
        let id = store.get('active_view')
        if (!id) {
            let new_view = listViews()[0]
            current_view.value = new_view.id
            current_view_name.value = new_view.name
            return listViews()[0]
        } else {
            let view_ = store.get("view."+id)
            current_view.value = id
            current_view_name.value = view_.name
            return store.get('view')[id]
        }
    }

    return { inputElements, addInput, deleteInput, setInputOption, saveView, createView, deleteView, listViews, switchTo, renameTo, getLastActiveView, current_view, current_view_name };
}