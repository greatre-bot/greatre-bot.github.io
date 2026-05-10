import { assetPath } from './assets';

type AudioWindow = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

let audioContext: AudioContext | null = null;
let masterGain: GainNode | null = null;
let backgroundAudio: HTMLAudioElement | null = null;
let enabled = true;
let musicRunning = false;

function getBackgroundAudio() {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!backgroundAudio) {
    backgroundAudio = new Audio(assetPath('assets/audio/i-like-it.mp3'));
    backgroundAudio.loop = true;
    backgroundAudio.preload = 'auto';
    backgroundAudio.volume = 0.34;
  }

  return backgroundAudio;
}

function getContext() {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!audioContext) {
    const AudioCtor = window.AudioContext ?? (window as AudioWindow).webkitAudioContext;
    if (!AudioCtor) {
      return null;
    }

    audioContext = new AudioCtor();
    masterGain = audioContext.createGain();
    masterGain.gain.value = 0.95;
    masterGain.connect(audioContext.destination);
  }

  void audioContext.resume();
  return audioContext;
}

function outputNode(ctx: AudioContext) {
  if (!masterGain) {
    masterGain = ctx.createGain();
    masterGain.gain.value = 0.95;
    masterGain.connect(ctx.destination);
  }

  return masterGain;
}

function tone(
  frequency: number,
  duration = 0.22,
  gainValue = 0.05,
  type: OscillatorType = 'sine',
  detune = 0,
) {
  if (!enabled) {
    return;
  }

  const ctx = getContext();
  if (!ctx) {
    return;
  }

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = frequency;
  osc.detune.value = detune;
  gain.gain.setValueAtTime(0.0001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(gainValue, ctx.currentTime + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(outputNode(ctx));
  osc.start();
  osc.stop(ctx.currentTime + duration + 0.02);
}

function noiseBurst(duration = 0.28, gainValue = 0.045) {
  if (!enabled) {
    return;
  }

  const ctx = getContext();
  if (!ctx) {
    return;
  }

  const sampleCount = Math.max(1, Math.floor(ctx.sampleRate * duration));
  const buffer = ctx.createBuffer(1, sampleCount, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < sampleCount; i += 1) {
    const fade = 1 - i / sampleCount;
    data[i] = (Math.random() * 2 - 1) * fade;
  }

  const source = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  filter.type = 'bandpass';
  filter.frequency.value = 1850;
  filter.Q.value = 0.8;
  gain.gain.setValueAtTime(gainValue, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
  source.buffer = buffer;
  source.connect(filter);
  filter.connect(gain);
  gain.connect(outputNode(ctx));
  source.start();
}

export function startSoundscape() {
  if (!enabled || musicRunning) {
    return;
  }

  const audio = getBackgroundAudio();
  if (!audio) {
    return;
  }

  musicRunning = true;
  void audio.play().catch(() => {
    musicRunning = false;
  });
}

export function stopSoundscape() {
  musicRunning = false;
  if (backgroundAudio) {
    backgroundAudio.pause();
  }
}

export function setSoundEnabled(nextEnabled: boolean) {
  enabled = nextEnabled;
  if (enabled) {
    startSoundscape();
    playBubbleSound();
  } else {
    stopSoundscape();
  }
}

export function playBubbleSound() {
  tone(740, 0.16, 0.11, 'sine');
  window.setTimeout(() => tone(980, 0.14, 0.07, 'sine'), 52);
}

export function playSplashSound() {
  noiseBurst(0.38, 0.16);
  tone(520, 0.2, 0.08, 'triangle', -8);
  window.setTimeout(() => tone(1180, 0.12, 0.06, 'sine'), 72);
}

export function playSelectSound() {
  tone(620, 0.12, 0.09, 'sine');
  window.setTimeout(() => tone(820, 0.12, 0.06, 'sine'), 46);
}

export function playClinkSound() {
  tone(1320, 0.18, 0.14, 'triangle');
  window.setTimeout(() => tone(1680, 0.16, 0.09, 'sine'), 64);
  window.setTimeout(() => noiseBurst(0.3, 0.12), 92);
}

export function playSpinSound() {
  noiseBurst(0.18, 0.08);
  tone(240, 0.5, 0.07, 'sawtooth', -14);
}

export function playPrizeSound(isWin: boolean) {
  if (isWin) {
    tone(660, 0.16, 0.1, 'sine');
    window.setTimeout(() => tone(880, 0.18, 0.1, 'sine'), 88);
    window.setTimeout(() => tone(1320, 0.22, 0.08, 'triangle'), 176);
    return;
  }

  tone(260, 0.22, 0.07, 'triangle');
}
