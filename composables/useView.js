const Store = require('electron-store')

const store = new Store()
const inputElements = ref(new Map())
const current_view = ref("")

export function useView() {

    function addInput() {
        let id = crypto.randomUUID()
        inputElements.value.set(id, { name: 'yay', type: 'text' })
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

    function switchTo(id) {
        current_view.value = id
        let view_ = store.get("view."+id)
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

    function listViews() {
        let views = store.get("view");
        if (!views) {
            createView("Default Workspace")
            return listViews()
        }
        return Object.keys(views).map(id => ({ id, name: views[id].name }));
    }

    return { inputElements, addInput, setInputOption, saveView, createView, listViews, switchTo, current_view };
}