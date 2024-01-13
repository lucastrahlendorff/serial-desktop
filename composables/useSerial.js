const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

const connected = ref(false)
const buffer    = ref(["", "", "", "", ""])
let connection  = null;

export function useSerial() {

    async function getPorts() {
        const ports = await SerialPort.list()
        return ports
    }

    function toggleConnection(port, baudRate) {
      let path = port.path
      if (connected.value) {
          connection.close()
          connected.value = false
          console.log("Disconnected.")
      } else {
        console.log("connecting...")
        connection = new SerialPort({ path, baudRate }, function (err) {
            if (err) {
                return console.error('Error: ', err.message)
            } else {
              console.log("Connected.")
              connected.value = true
              window.parser = connection.pipe(new ReadlineParser({ delimiter: '\r\n' }))
              window.parser.on('data', handleData)
            }
        })
      }
    }
    
    function handleData(newData) {
      console.log(newData)
      let list = buffer.value
      list.push(newData)
      list.shift()
      buffer.value = list
    }
    
    function writeSerial(data) {
      if (connected && connection) {
        connection.write(data, function(err) {
          if (err) {
            return console.error('Error on write: ', err.message)
          }
          console.log('message written')
        })
      } else {
        console.info('message not written: no connection')
      }
    }
    
    function setVar(name, value) {
      console.log(name, value)
      writeSerial(name + ":" + value)
    }

    return { connected, buffer, getPorts, toggleConnection, writeSerial, setVar };
}