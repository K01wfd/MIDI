const korgTritonSetting = {
  name: 'TRITON Extreme',

  sendTranspose(output, value) {
    if (output) {
      const hexValue = '0x' + value.toString(16).padStart(2, '0');

      const message = [
        '0xF0',
        '0x42',
        '0x3g',
        '0x50',
        '0x51',
        '0x01',

        '0x63',
        '0xF7',
      ];
      const sysExMessage = [
        0xf0, 0x42, 0x30, 0x50, 0x51, 0x01, 0x00, 0x00, 0xf7,
      ];
      output.send(sysExMessage);
      return true;
    } else {
      console.log('No out put selected');
      return false;
    }
  },
};
