async function testIt () {
  try {
    const port = await navigator.serial.requestPort()
    const portInfo = port.getInfo()
    document.getElementById('device-name').innerHTML = `vendorId: ${portInfo.usbVendorId} | productId: ${portInfo.usbProductId} `
  } catch (ex) {
    if (ex.name === 'NotFoundError') {
      document.getElementById('device-name').innerHTML = 'Device NOT found'
    } else {
      document.getElementById('device-name').innerHTML = ex
    }
  }
}

document.getElementById('clickme').addEventListener('click', testIt)