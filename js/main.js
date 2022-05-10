// Initializing speechSynth API
const synth = window.speechSynthesis;

//
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

//Browser identifier

var isFirefox = typeof InstallTrigger !== 'undefined';

var isChrome = !!window.isChrome && !!window.isChrome.webstore;

let voices = [];

const getVoices = () => {
  voices = synth.getVoices();

  voices.forEach(voice => {

    const option = document.createElement('option');

    option.textContent = voice.name + '(' + voice.lang + ')';

    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  });
};

getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// ## results in error of not loading any voices
// if (isFirefox) {
//     getVoices();
// }

// if (isChrome) {
//     if (synth.onvoiceschanged !== undefined) {
//         synth.onvoiceschanged = getVoices;
//     }
// }


const speak = () => {
  
  if (synth.speaking) {
    console.error('Already speaking...');
    return;
  }
  if (textInput.value !== '') {

    body.style.background = '#141414 url(img/wave.gif)';
    body.style.backgroundRepeat = 'repeat-x';
    body.style.backgroundSize = '100% 100%';

    const speakText = new SpeechSynthesisUtterance(textInput.value);

    speakText.onend = e => {
      console.log('Done speaking...');
      body.style.background = '#141414';
    };

    // Speak error
    speakText.onerror = e => {
      console.error('Something went wrong');
    };

    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      'data-name'
    );

    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    speakText.rate = rate.value;
    speakText.pitch = pitch.value;
    // Speak
    synth.speak(speakText);
  }
};

// Text form submit
textForm.addEventListener('submit', e => {
  e.preventDefault();
  speak();
  textInput.blur();
});

// Rate value change
rate.addEventListener('change', e => (rateValue.textContent = rate.value));

// Pitch value change
pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));

// Voice select change
voiceSelect.addEventListener('change', e => speak());
