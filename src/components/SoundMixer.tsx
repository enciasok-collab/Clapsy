/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Play, Pause, Volume2, HelpCircle, Activity, Sparkles, AlertCircle } from "lucide-react";
import { SoundOption } from "../types";

export default function SoundMixer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [activePreset, setActivePreset] = useState<string>("default");

  // State for each sound channel
  const [sounds, setSounds] = useState<SoundOption[]>([
    {
      id: "binaural",
      name: "Binaural Delta (4Hz)",
      category: "frequencies",
      description: "Estímulo cerebral clínico para inducir relajación profunda y sueño regenerativo.",
      active: false,
      volume: 0.5,
      iconName: "brain",
    },
    {
      id: "brown",
      name: "Ruido Marrón Clínico",
      category: "therapy",
      description: "Frecuencia cálida y profunda que silencia la hiperactividad mental y la rumiación nocturna.",
      active: false,
      volume: 0.4,
      iconName: "ocean",
    },
    {
      id: "mandibular",
      name: "Frecuencias de Alivio ATM",
      category: "therapy",
      description: "Tono clínico modulado para inducir la relajación propioceptiva de la mandíbula y cuello.",
      active: false,
      volume: 0.3,
      iconName: "shield",
    },
    {
      id: "rain",
      name: "Lluvia de Medianoche",
      category: "nature",
      description: "Ruido blanco procesado orgánicamente para aislar los ruidos del entorno.",
      active: false,
      volume: 0.3,
      iconName: "cloud-rain",
    },
  ]);

  // Web Audio refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  
  // Nodes refs for each channel
  const nodesRef = useRef<{
    [key: string]: {
      gainNode: GainNode;
      sources: any[]; // Oscillators or BufferSources
    };
  }>({});

  // Initialize Audio Context on demand (required by browser policies)
  const initAudio = () => {
    if (audioCtxRef.current) return;

    try {
      // Setup audio context
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Initialize structures for each sound channel
      sounds.forEach((sound) => {
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.connect(ctx.destination);
        nodesRef.current[sound.id] = {
          gainNode,
          sources: [],
        };
      });

      setAudioEnabled(true);
    } catch (err) {
      console.error("Failed to initialize Web Audio API:", err);
    }
  };

  // Sound generator functions
  const startBinaural = (gainNode: GainNode, ctx: AudioContext, volume: number) => {
    // Left ear oscillator
    const oscL = ctx.createOscillator();
    oscL.type = "sine";
    oscL.frequency.setValueAtTime(100, ctx.currentTime); // 100 Hz

    // Right ear oscillator
    const oscR = ctx.createOscillator();
    oscR.type = "sine";
    oscR.frequency.setValueAtTime(104, ctx.currentTime); // 104 Hz (Delta 4Hz difference)

    // Stereo panning
    const pannerL = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    const pannerR = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

    if (pannerL && pannerR) {
      pannerL.pan.setValueAtTime(-1, ctx.currentTime);
      pannerR.pan.setValueAtTime(1, ctx.currentTime);
      
      oscL.connect(pannerL);
      oscR.connect(pannerR);
      
      pannerL.connect(gainNode);
      pannerR.connect(gainNode);
    } else {
      // Fallback if stereo panner is not supported
      oscL.connect(gainNode);
      oscR.connect(gainNode);
    }

    oscL.start();
    oscR.start();

    // Fade-in volume smoothly
    gainNode.gain.cancelScheduledValues(ctx.currentTime);
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 1.5);

    return [oscL, oscR];
  };

  const startBrownNoise = (gainNode: GainNode, ctx: AudioContext, volume: number) => {
    // Generate 5 seconds of brown noise buffer
    const bufferSize = ctx.sampleRate * 5;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Brownian calculation: cumulative random walk with leak factor to prevent clipping
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5; // Gain compensation
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    // Apply lowpass filter to make it even darker
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(400, ctx.currentTime);

    noiseSource.connect(filter);
    filter.connect(gainNode);
    noiseSource.start();

    // Smooth fade-in
    gainNode.gain.cancelScheduledValues(ctx.currentTime);
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 1.5);

    return [noiseSource];
  };

  const startMandibularTone = (gainNode: GainNode, ctx: AudioContext, volume: number) => {
    // Extremely low frequency relaxing sine tone (110 Hz) modulated by a gentle LFO (0.2 Hz)
    const carrier = ctx.createOscillator();
    carrier.type = "sine";
    carrier.frequency.setValueAtTime(110, ctx.currentTime);

    const modulator = ctx.createOscillator();
    modulator.type = "sine";
    modulator.frequency.setValueAtTime(0.2, ctx.currentTime); // 0.2 Hz LFO

    const modGain = ctx.createGain();
    modGain.gain.setValueAtTime(8, ctx.currentTime); // Modulation depth of 8Hz

    modulator.connect(modGain);
    modGain.connect(carrier.frequency);

    carrier.connect(gainNode);

    modulator.start();
    carrier.start();

    // Smooth fade-in
    gainNode.gain.cancelScheduledValues(ctx.currentTime);
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 1.5);

    return [carrier, modulator];
  };

  const startRainNoise = (gainNode: GainNode, ctx: AudioContext, volume: number) => {
    // Generate 3 seconds of white noise, then shape it to sound like heavy rain
    const bufferSize = ctx.sampleRate * 3;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    // Bandpass filter to isolate the "rain" frequencies
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.Q.setValueAtTime(0.6, ctx.currentTime);

    // Modulation for the wind/rain swell
    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.setValueAtTime(0.1, ctx.currentTime); // 10-second waves

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(250, ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    noiseSource.connect(filter);
    filter.connect(gainNode);

    lfo.start();
    noiseSource.start();

    // Smooth fade-in
    gainNode.gain.cancelScheduledValues(ctx.currentTime);
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume * 0.7, ctx.currentTime + 1.5); // compensated volume

    return [noiseSource, lfo];
  };

  // Start a specific sound node
  const startSound = (soundId: string, volume: number) => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const channel = nodesRef.current[soundId];
    if (!channel) return;

    // Stop any existing sources in this channel first
    channel.sources.forEach((s) => {
      try {
        s.stop();
      } catch (e) {}
    });
    channel.sources = [];

    let sources: any[] = [];
    if (soundId === "binaural") {
      sources = startBinaural(channel.gainNode, ctx, volume);
    } else if (soundId === "brown") {
      sources = startBrownNoise(channel.gainNode, ctx, volume);
    } else if (soundId === "mandibular") {
      sources = startMandibularTone(channel.gainNode, ctx, volume);
    } else if (soundId === "rain") {
      sources = startRainNoise(channel.gainNode, ctx, volume);
    }

    channel.sources = sources;
  };

  // Stop a specific sound node
  const stopSound = (soundId: string) => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const channel = nodesRef.current[soundId];
    if (!channel) return;

    // Fade out smoothly
    channel.gainNode.gain.cancelScheduledValues(ctx.currentTime);
    channel.gainNode.gain.setValueAtTime(channel.gainNode.gain.value, ctx.currentTime);
    channel.gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.0);

    // Schedule actual source stop after fade-out
    const activeSources = [...channel.sources];
    channel.sources = [];

    setTimeout(() => {
      activeSources.forEach((s) => {
        try {
          s.stop();
        } catch (e) {}
      });
    }, 1200);
  };

  // Master Play/Pause
  const handleMasterToggle = async () => {
    if (!audioEnabled) {
      initAudio();
    }

    const ctx = audioCtxRef.current;
    if (!ctx) return;

    if (isPlaying) {
      // Suspend audio context
      await ctx.suspend();
      setIsPlaying(false);
    } else {
      // Resume and play active sounds
      await ctx.resume();
      setIsPlaying(true);

      // Play any channel that is marked active
      sounds.forEach((sound) => {
        if (sound.active && nodesRef.current[sound.id]?.sources.length === 0) {
          startSound(sound.id, sound.volume);
        }
      });
    }
  };

  // Channel volume change
  const handleVolumeChange = (soundId: string, volume: number) => {
    setSounds((prev) =>
      prev.map((s) => (s.id === soundId ? { ...s, volume } : s))
    );

    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const channel = nodesRef.current[soundId];
    if (channel && sounds.find((s) => s.id === soundId)?.active) {
      channel.gainNode.gain.cancelScheduledValues(ctx.currentTime);
      channel.gainNode.gain.setValueAtTime(channel.gainNode.gain.value, ctx.currentTime);
      channel.gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.1);
    }
  };

  // Toggle active sound channel
  const handleSoundToggle = (soundId: string) => {
    if (!audioEnabled) {
      initAudio();
    }

    setSounds((prev) => {
      const updated = prev.map((s) => {
        if (s.id === soundId) {
          const newActive = !s.active;
          
          if (isPlaying && audioCtxRef.current) {
            if (newActive) {
              startSound(soundId, s.volume);
            } else {
              stopSound(soundId);
            }
          }
          
          return { ...s, active: newActive };
        }
        return s;
      });

      // Update preset selection based on custom toggles
      setActivePreset("custom");
      return updated;
    });
  };

  // Preset quick selections
  const applyPreset = (presetId: string) => {
    if (!audioEnabled) {
      initAudio();
    }

    setActivePreset(presetId);

    let activeMap: { [key: string]: { active: boolean; vol: number } } = {};
    if (presetId === "profundo") {
      activeMap = {
        binaural: { active: true, vol: 0.6 },
        brown: { active: true, vol: 0.4 },
        mandibular: { active: false, vol: 0.2 },
        rain: { active: false, vol: 0.2 },
      };
    } else if (presetId === "bruxismo") {
      activeMap = {
        binaural: { active: true, vol: 0.3 },
        brown: { active: false, vol: 0.2 },
        mandibular: { active: true, vol: 0.75 },
        rain: { active: true, vol: 0.2 },
      };
    } else if (presetId === "lluvia") {
      activeMap = {
        binaural: { active: false, vol: 0.2 },
        brown: { active: true, vol: 0.3 },
        mandibular: { active: false, vol: 0.2 },
        rain: { active: true, vol: 0.7 },
      };
    } else {
      // Default / Off
      activeMap = {
        binaural: { active: false, vol: 0.5 },
        brown: { active: false, vol: 0.4 },
        mandibular: { active: false, vol: 0.3 },
        rain: { active: false, vol: 0.3 },
      };
    }

    setSounds((prev) =>
      prev.map((s) => {
        const config = activeMap[s.id];
        const updatedActive = config.active;
        const updatedVol = config.vol;

        if (isPlaying && audioCtxRef.current) {
          if (updatedActive) {
            startSound(s.id, updatedVol);
          } else {
            stopSound(s.id);
          }
        }

        return { ...s, active: updatedActive, volume: updatedVol };
      })
    );
  };

  // Clean up nodes on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <section id="audio-demo" className="relative py-24 md:py-32 bg-brand-charcoal overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-brand-olive-dark/25 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-brand-gold/5 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Header Title with StoryBrand copy */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold text-brand-gold tracking-widest uppercase inline-flex items-center gap-1.5 px-3.5 py-1 bg-brand-gold/10 border border-brand-gold/20 rounded-full mb-4">
            <Sparkles className="w-3 h-3" /> DEMO INTERACTIVA
          </span>
          <h2 className="font-serif font-semibold text-3xl md:text-5xl text-brand-beige tracking-tight mb-5">
            Ingeniería acústica para <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-brand-beige to-brand-gold-light">
              silenciar el estrés y el bruxismo
            </span>
          </h2>
          <p className="font-sans text-brand-beige-dark/80 text-base md:text-lg leading-relaxed">
            Experimenta el sonido terapéutico de Clapsy Sleep en tiempo real. 
            Activa el reproductor y combina nuestras frecuencias de laboratorio diseñadas 
            para inducir la desconexión mental y aliviar la tensión mandibular antes de dormir.
          </p>
        </div>

        {/* Console Box (Apple / Tesla aesthetic) */}
        <div className="bg-brand-charcoal-light/70 border border-brand-olive-light/10 rounded-3xl p-6 md:p-10 backdrop-blur-xl shadow-2xl relative">
          
          {/* Top Panel Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 mb-8 border-b border-brand-olive-light/10">
            <div className="flex items-center gap-4">
              {/* Play Button */}
              <button
                onClick={handleMasterToggle}
                className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isPlaying
                    ? "bg-brand-beige text-brand-charcoal hover:scale-105"
                    : "bg-gradient-to-tr from-brand-gold-dark to-brand-gold text-brand-charcoal hover:scale-105 shadow-lg shadow-brand-gold/10 hover:shadow-brand-gold/20"
                }`}
                aria-label={isPlaying ? "Pausar sonido" : "Activar sonido"}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-brand-charcoal" />
                ) : (
                  <Play className="w-6 h-6 fill-brand-charcoal ml-1" />
                )}
              </button>
              
              <div>
                <p className="font-display font-semibold text-brand-beige text-lg md:text-xl">
                  {isPlaying ? "Sintonizando frecuencias..." : "Consola de Sonidos Clínicos"}
                </p>
                <p className="text-xs font-mono text-brand-gold/90 mt-0.5 flex items-center gap-1.5">
                  <Activity className={`w-3.5 h-3.5 ${isPlaying ? "animate-pulse" : ""}`} />
                  {isPlaying ? "REPRODUCIENDO EN VIVO (WEB AUDIO)" : "AUDIO DESACTIVADO · HAZ CLIC PARA INICIAR"}
                </p>
              </div>
            </div>

            {/* Presets Grid */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-brand-beige-dark/60 mr-2">Presets Clínicos:</span>
              <button
                onClick={() => applyPreset("profundo")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activePreset === "profundo"
                    ? "bg-brand-olive text-brand-gold border border-brand-gold/30"
                    : "bg-brand-charcoal hover:bg-brand-olive/20 text-brand-beige-dark/80 border border-brand-olive-light/10"
                }`}
              >
                Sueño Delta
              </button>
              <button
                onClick={() => applyPreset("bruxismo")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activePreset === "bruxismo"
                    ? "bg-brand-olive text-brand-gold border border-brand-gold/30"
                    : "bg-brand-charcoal hover:bg-brand-olive/20 text-brand-beige-dark/80 border border-brand-olive-light/10"
                }`}
              >
                Alivio ATM/Bruxismo
              </button>
              <button
                onClick={() => applyPreset("lluvia")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activePreset === "lluvia"
                    ? "bg-brand-olive text-brand-gold border border-brand-gold/30"
                    : "bg-brand-charcoal hover:bg-brand-olive/20 text-brand-beige-dark/80 border border-brand-olive-light/10"
                }`}
              >
                Lluvia Profunda
              </button>
            </div>
          </div>

          {/* Core Sound List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sounds.map((sound) => (
              <div
                key={sound.id}
                className={`p-5 rounded-2xl transition-all duration-300 border ${
                  sound.active
                    ? "bg-brand-olive/20 border-brand-gold/30"
                    : "bg-brand-charcoal/40 border-brand-olive-light/5 hover:border-brand-olive-light/20"
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleSoundToggle(sound.id)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                        sound.active
                          ? "bg-brand-gold text-brand-charcoal shadow-inner"
                          : "bg-brand-charcoal-light text-brand-beige-dark border border-brand-olive-light/10 hover:border-brand-gold/30"
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <div>
                      <h4 className="font-display font-medium text-brand-beige text-sm md:text-base flex items-center gap-2">
                        {sound.name}
                        {sound.active && isPlaying && (
                          <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold"></span>
                          </span>
                        )}
                      </h4>
                      <p className="text-xs font-mono text-brand-gold/80 capitalize mt-0.5">
                        {sound.category === "therapy" ? "Terapia Clínica" : sound.category === "frequencies" ? "Estimulación Cerebral" : "Naturaleza Binaural"}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-brand-beige-dark/75 leading-relaxed mb-4 h-10 overflow-hidden line-clamp-2">
                  {sound.description}
                </p>

                {/* Volume Slider */}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-brand-beige-dark/50">Mín</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    disabled={!sound.active}
                    value={sound.volume}
                    onChange={(e) => handleVolumeChange(sound.id, parseFloat(e.target.value))}
                    className="w-full h-1 bg-brand-charcoal-light rounded-lg appearance-none cursor-pointer accent-brand-gold disabled:opacity-20 disabled:cursor-not-allowed"
                    style={{
                      background: sound.active
                        ? `linear-gradient(to right, #D4AF37 0%, #D4AF37 ${sound.volume * 100}%, #161816 ${sound.volume * 100}%, #161816 100%)`
                        : "#161816",
                    }}
                  />
                  <span className="text-[10px] font-mono text-brand-gold">{Math.round(sound.volume * 100)}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Advice note */}
          <div className="mt-8 flex items-start gap-3 p-4 rounded-xl bg-brand-olive-dark/10 border border-brand-olive-light/5 text-xs text-brand-beige-dark/70">
            <AlertCircle className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
            <p>
              <strong>Aviso de reproducción:</strong> Si experimentas silencio al presionar el botón de inicio, 
              asegúrate de que los canales individuales estén encendidos (con volumen) y que tu dispositivo no esté en modo silencioso. 
              Nuestras ondas binaurales de baja frecuencia se aprecian mejor utilizando auriculares estéreo.
            </p>
          </div>
        </div>

        {/* Benefits footer for scientific proof */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 text-center">
          <div className="p-4 border border-brand-olive-light/5 rounded-2xl bg-brand-charcoal-light/30">
            <p className="font-display font-semibold text-brand-beige text-lg">Delta Brain Entrainment</p>
            <p className="text-xs text-brand-beige-dark/60 mt-1">Efecto clínico de osciladores binaurales que facilita el paso a fases de sueño reparador.</p>
          </div>
          <div className="p-4 border border-brand-olive-light/5 rounded-2xl bg-brand-charcoal-light/30">
            <p className="font-display font-semibold text-brand-beige text-lg">Inhibición Mandibular</p>
            <p className="text-xs text-brand-beige-dark/60 mt-1">Sonidos diseñados para interrumpir la vía propioceptiva refleja que genera bruxismo estático.</p>
          </div>
          <div className="p-4 border border-brand-olive-light/5 rounded-2xl bg-brand-charcoal-light/30">
            <p className="font-display font-semibold text-brand-beige text-lg">0% Distracción Cognitiva</p>
            <p className="text-xs text-brand-beige-dark/60 mt-1">Enmascaramiento auditivo que reduce la atención de alerta, deteniendo el estrés nocturno.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
