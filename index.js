const currentKeyboard = document.querySelector('.current-keyboard');
const connectBtn = document.getElementById('connect-btn');

const transPlus = document.querySelector("[data-id='transPlus']");
const transMinus = document.querySelector("[data-id='transMinus']");
const transposeValue = document.querySelector('.trans-value');

const combiBtn = document.querySelector('.combiModeBtn');
const progBtn = document.querySelector('.progModeBtn');
const globalBtn = document.querySelector('.globalModeBtn');

const octaveUpBtn = document.querySelector('[data-id="octaveup"]');
const octaveDownBtn = document.querySelector('[data-id="octavedown"]');

const settingButton = document.querySelector('.setting-button');
const settingWindow = document.querySelector('.setting-window');
const closeSettingButton = document.querySelector('.close-setting-button');

const scaleNotes = document.querySelectorAll("[data-id='scalenote']");

const resetBitton = document
  .querySelector('.reset-button')
  .addEventListener('click', resetGlobal);

let output;

let defaultTranspose = 256;

let defaultOctave = 0;
const storedNotes = [];

connectBtn.addEventListener('click', () => location.reload());

window.navigator.requestMIDIAccess({ sysex: true }).then((access) => {
  for (let out of access.outputs.values()) {
    currentKeyboard.textContent = out.name;
    if (out.name.includes('TRITON Extreme 1 SOUND')) {
      output = out;
    }
  }
  access.inputs.forEach(
    (input) =>
      (input.onmidimessage = (e) => {
        console.log(e.data);
      })
  );
});

document.addEventListener('DOMContentLoaded', () => {
  transposeValue.setAttribute('style', 'font-size:1.2rem;');
});

if (!output) currentKeyboard.textContent = 'NO OUTPUT';

// RESET GLOBAL
function resetGlobal() {
  korgTritonSetting.sendGlobalReset(output);
}

// SEND TRANSPOSE
transPlus.addEventListener('click', () => {
  if (defaultTranspose < 268) defaultTranspose++;
  const resault = korgTritonSetting.sendTranspose(output, defaultTranspose);

  if (resault) {
    if (defaultTranspose > 256) {
      transPlus.classList.add('active-btn');
      transMinus.classList.remove('active-btn');
    } else {
      transPlus.classList.remove('active-btn');
      transMinus.classList.remove('active-btn');
    }
    transposeValue.textContent = defaultTranspose - 256;
  }
});
transMinus.addEventListener('click', () => {
  if (defaultTranspose > 244) defaultTranspose--;
  const resault = korgTritonSetting.sendTranspose(output, defaultTranspose);
  if (resault) {
    if (defaultTranspose < 256) {
      transPlus.classList.remove('active-btn');
      transMinus.classList.add('active-btn');
    } else {
      transPlus.classList.remove('active-btn');
      transMinus.classList.remove('active-btn');
    }
    transposeValue.textContent = defaultTranspose - 256;
  }
});

// MODE CHANGE
combiBtn.addEventListener('click', () => {
  korgTritonSetting.changeMode(output, 0);
});
progBtn.addEventListener('click', () => {
  korgTritonSetting.changeMode(output, 2);
});
globalBtn.addEventListener('click', () => {
  korgTritonSetting.changeMode(output, 7);
});

// SEND OCTAVE
octaveUpBtn.addEventListener('click', (e) => {
  console.log(e.target.dataset.id);
});
octaveDownBtn.addEventListener('click', (e) => {
  console.log(e.target.dataset.id);
});

// OCTAVE SCALLE
scaleNotes.forEach((note) => {
  note.addEventListener('click', (e) => {
    note.classList.toggle('active-note');
    const noteValue = e.target.dataset.value;
    if (storedNotes.indexOf(noteValue) === -1) {
      storedNotes.push(noteValue);
    } else {
      storedNotes.splice(storedNotes.indexOf(noteValue), 1);
    }
    korgTritonSetting.sendMinus50(output);
  });
});

// SETTING
settingButton.addEventListener('click', (ev) => {
  settingWindow.showModal();
});
closeSettingButton.addEventListener('click', () => {
  settingWindow.close();
});
