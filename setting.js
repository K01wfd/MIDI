const korgTritonSetting = {
  name: 'TRITON Extreme',
  sendTranspose(output, value) {
    const hexValue = convertTo7bitChunk(value);
    console.log(hexValue);
    const transposeMessage = [
      0xf0,
      0x42,
      0x30,
      0x50,
      0x4e,
      0x07,
      0x00,
      0x01,
      0x00,
      0x00,
      0x00,
      hexValue,
      0xf7,
    ];

    if (output) {
      output.send(transposeMessage);
      return true;
    } else {
      console.log('No out put selected');
      return false;
    }
  },
  sendGlobalReset(output) {
    if (output) {
      output.send();
      return true;
    } else {
      console.log('No out put selected');
      return false;
    }
  },
  sendMinus50(output) {
    if (output) {
      output.send();
      return true;
    } else {
      console.log('No out put selected');
      return false;
    }
  },
  changeMode(output, modeValue) {
    const hex = 0x0 + modeValue;

    const modeChangeMessage = [0xf0, 0x42, 0x30, 0x50, 0x4e, hex, 0xf7];
    console.log(modeChangeMessage);
    if (output) {
      output.send(modeChangeMessage);
      return true;
    } else {
      console.log('No out put selected');
      return false;
    }
  },
};
// Bit15-13 of Value Data is the Sign Flag, and each bit has the same value
// Value Data  SSSHHHHH LLLLLLLL  (S=Sign H,L=13bit data)
// MIDI Data   0SHHHHHL 0LLLLLLL
