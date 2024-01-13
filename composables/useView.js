const Store = require('electron-store');

const store = new Store();
const inputElements = ref(new Map());

export function useView() {
    function addInput() {
        let id = crypto.randomUUID()
        inputElements.value.set(id, { name: 'yay', type: 'text' })
        saveView()
    }

    function getInput(id) {
        return inputElements.value.get(id)
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
        store.set('view', { inputs: Object.fromEntries(inputElements.value) })
    }

    function getView() {
        console.log('getView')
        let view = store.get('view', inputElements.value)
        console.log(view)
        inputElements.value = new Map(Object.entries(view.inputs))
    }

    return { inputElements, addInput, getInput, setInputOption, getView, saveView };
}