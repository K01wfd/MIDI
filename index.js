const currentKeyboard = document.querySelector('.current-keyboard');
const connectBtn = document.getElementById('connect-btn');
const transPlus = document.querySelector("[data-id='transPlus']");
const transMinus = document.querySelector("[data-id='transMinus']");
const transposeValue = document.querySelector('.trans-value');
const octaveUpBtn = document.querySelector('[data-id="octaveup"]');
const octaveDownBtn = document.querySelector('[data-id="octavedown"]');
const settingButton = document.querySelector('.setting-button');
const settingWindow = document.querySelector('.setting-window');
const closeSettingButton = document.querySelector('.close-setting-button');
const scaleNotes = document.querySelectorAll("[data-id='scalenote']");

// MIDI OUTPUT
let output;
// DEFAULT VALUES
let defaultTranspose = 232;
let defaultOctave = 0;
const storedNotes = [];

connectBtn.addEventListener('click', () => location.reload());
window.navigator.requestMIDIAccess({ sysex: true }).then((access) => {
  access.onstatechange = (e) => console.log(e);
  for (let out of access.outputs.values()) {
    currentKeyboard.textContent = out.name;
    if (out.name.includes('TRITON Extreme 1 SOUND')) {
    }
    output = out;
  }
});
document.addEventListener('DOMContentLoaded', () => {
  transposeValue.setAttribute('style', 'font-size:1.2rem;');
});
if (!output) currentKeyboard.textContent = 'NO OUTPUT';

// SEND TRANSPOSE
transPlus.addEventListener('click', () => {
  if (defaultTranspose < 244) defaultTranspose++;
  const resault = korgTritonSetting.sendTranspose(output, defaultTranspose);

  if (resault) {
    if (defaultTranspose > 232) {
      transPlus.classList.add('active-btn');
      transMinus.classList.remove('active-btn');
    } else {
      transPlus.classList.remove('active-btn');
      transMinus.classList.remove('active-btn');
    }

    transposeValue.textContent = defaultTranspose - 232;
  }
});
transMinus.addEventListener('click', () => {
  if (defaultTranspose > 220) defaultTranspose--;
  const resault = korgTritonSetting.sendTranspose(output, defaultTranspose);
  if (resault) {
    if (defaultTranspose > 220) {
      transPlus.classList.remove('active-btn');
      transMinus.classList.add('active-btn');
    } else {
      transPlus.classList.remove('active-btn');
      transMinus.classList.remove('active-btn');
    }
    transposeValue.textContent = defaultTranspose - 232;
  }
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
  });
});
// SETTING
settingButton.addEventListener('click', (ev) => {
  settingWindow.showModal();
});
closeSettingButton.addEventListener('click', () => {
  settingWindow.close();
});
