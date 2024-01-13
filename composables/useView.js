const inputElements = ref(new Map());

export function useView() {
    function addInput() {
        let id = crypto.randomUUID()
        inputElements.value.set(id, { name: 'yay', type: 'text' })
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
    }

    return { inputElements, addInput, getInput, setInputOption };
}