/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Eye, ShieldCheck, HeartPulse, RefreshCw } from "lucide-react";

interface PacingPreset {
  name: string;
  inhale: number; // seconds
  hold: number;
  exhale: number;
  rest: number;
  description: string;
}

export default function BreathingPacer() {
  const presets: PacingPreset[] = [
    {
      name: "Descompresión Clapsy (4-4-6)",
      inhale: 4,
      hold: 4,
      exhale: 6,
      rest: 2,
      description: "Diseñado para desactivar el reflejo trigeminal y relajar los maseteros.",
    },
    {
      name: "Respiración Vagotónica (4-0-4)",
      inhale: 4,
      hold: 0,
      exhale: 4,
      rest: 2,
      description: "Estimula el tono vagal ralentizando el pulso y aliviando la mente acelerada.",
    },
    {
      name: "Alivio de Bruxismo Agudo (5-2-7)",
      inhale: 5,
      hold: 2,
      exhale: 7,
      rest: 3,
      description: "Estiramiento miofascial profundo de la ATM y musculatura temporal.",
    },
  ];

  const [activePreset, setActivePreset] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "rest">("rest");
  const [secondsLeft, setSecondsLeft] = useState(2);
  const timerRef = useRef<any>(null);

  const preset = presets[activePreset];

  // Logic to handle breathing cycle
  useEffect(() => {
    if (!isRunning) {
      setPhase("rest");
      setSecondsLeft(2);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const runCycle = () => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Transition to next phase
          setPhase((currentPhase) => {
            switch (currentPhase) {
              case "rest":
                return "inhale";
              case "inhale":
                return preset.hold > 0 ? "hold" : "exhale";
              case "hold":
                return "exhale";
              case "exhale":
                return "rest";
              default:
                return "inhale";
            }
          });

          // Return duration of next phase
          setTimeout(() => {
            setPhase((nextPhase) => {
              switch (nextPhase) {
                case "inhale":
                  setSecondsLeft(preset.inhale);
                  break;
                case "hold":
                  setSecondsLeft(preset.hold);
                  break;
                case "exhale":
                  setSecondsLeft(preset.exhale);
                  break;
                case "rest":
                  setSecondsLeft(preset.rest);
                  break;
              }
              return nextPhase;
            });
          }, 0);

          return 1;
        }
        return prev - 1;
      });
    };

    // Set initial phase seconds
    setPhase("inhale");
    setSecondsLeft(preset.inhale);

    timerRef.current = setInterval(runCycle, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, activePreset]);

  // Reset helper
  const handleToggle = () => {
    setIsRunning(!isRunning);
  };

  // Phase instructional descriptions
  const getPhaseInstructions = () => {
    switch (phase) {
      case "inhale":
        return {
          title: "INHALA",
          instruction: "Abre ligeramente los labios y ensancha el espacio mandibular posterior sin forzar.",
          color: "text-brand-gold",
          sub: "Estimulando receptores trigeminales",
        };
      case "hold":
        return {
          title: "MANTÉN",
          instruction: "Siente el aire llenando tus costados. Mantén la mandíbula ancha, suelta y libre.",
          color: "text-brand-beige",
          sub: "Calma propioceptiva",
        };
      case "exhale":
        return {
          title: "EXHALA Y LIBERA",
          instruction: "Suelta el aire lentamente. Siente cómo tus mejillas y mandíbula caen con total laxitud.",
          color: "text-brand-olive-light",
          sub: "Descompresión total del masetero",
        };
      case "rest":
      default:
        return {
          title: isRunning ? "PAUSA EN VACÍO" : "PREPARADO",
          instruction: isRunning
            ? "Pausa tranquila. Dientes separados, lengua reposando en el paladar."
            : "Haz clic en 'Iniciar' para comenzar tu ejercicio de descompresión mandibular.",
          color: "text-brand-beige-dark/60",
          sub: "Punto de reposo fisiológico",
        };
    }
  };

  const instruction = getPhaseInstructions();

  // Pulse effect calculation for scaling breathing circle
  const getCircleScale = () => {
    if (!isRunning) return 1.0;
    switch (phase) {
      case "inhale":
        return 1.35; // Grow
      case "hold":
        return 1.35; // Keep large
      case "exhale":
        return 0.95; // Shrink
      case "rest":
        return 1.0;  // Normal
    }
  };

  return (
    <section id="metodo" className="relative py-24 md:py-32 bg-brand-charcoal-light/30 border-y border-brand-olive-light/5 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        
        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Interactive visual pacer canvas */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            
            {/* Visual Canvas Backdrop */}
            <div className="absolute w-[350px] h-[350px] rounded-full bg-brand-olive/15 blur-[60px] pointer-events-none" />
            
            {/* Elegant outer housing ring */}
            <div className="w-72 h-72 md:w-80 md:h-80 rounded-full border border-brand-olive-light/10 flex items-center justify-center relative bg-brand-charcoal/40 backdrop-blur-md shadow-2xl">
              
              {/* Animated Inner Breathing Sphere */}
              <div
                className="absolute rounded-full transition-all duration-[4000ms] ease-in-out flex items-center justify-center"
                style={{
                  width: "180px",
                  height: "180px",
                  transform: `scale(${getCircleScale()})`,
                  background: phase === "inhale"
                    ? "radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.03) 70%, transparent 100%)"
                    : phase === "hold"
                    ? "radial-gradient(circle, rgba(247,245,240,0.1) 0%, rgba(247,245,240,0.02) 70%, transparent 100%)"
                    : phase === "exhale"
                    ? "radial-gradient(circle, rgba(92,110,94,0.15) 0%, rgba(92,110,94,0.03) 70%, transparent 100%)"
                    : "radial-gradient(circle, rgba(39,47,40,0.1) 0%, rgba(39,47,40,0.01) 70%, transparent 100%)",
                  border: phase === "inhale"
                    ? "1px solid rgba(212,175,55,0.2)"
                    : phase === "hold"
                    ? "1px solid rgba(247,245,240,0.15)"
                    : phase === "exhale"
                    ? "1px solid rgba(92,110,94,0.2)"
                    : "1px solid rgba(92,110,94,0.05)",
                }}
              >
                {/* Visual pulse rings */}
                {isRunning && (phase === "inhale" || phase === "hold") && (
                  <div className="absolute inset-0 rounded-full border border-brand-gold/30 animate-ping opacity-25" />
                )}
              </div>

              {/* Center Counter Display */}
              <div className="text-center z-10 flex flex-col items-center">
                <span className={`text-5xl font-display font-light transition-all ${instruction.color}`}>
                  {secondsLeft}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-brand-beige-dark/50 uppercase mt-1">
                  SEGUNDOS
                </span>
                <span className="text-xs font-mono font-medium text-brand-gold mt-2 px-2.5 py-0.5 bg-brand-gold/10 rounded-full">
                  {phase.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Play trigger button below */}
            <button
              onClick={handleToggle}
              className={`mt-8 px-8 py-3.5 rounded-full font-semibold tracking-wide transition-all duration-300 shadow-lg ${
                isRunning
                  ? "bg-brand-charcoal border border-brand-olive-light/20 text-brand-beige hover:bg-brand-olive-dark/40"
                  : "bg-brand-beige text-brand-charcoal hover:bg-brand-beige-dark hover:scale-[1.03]"
              }`}
            >
              {isRunning ? "Pausar Ejercicio" : "Iniciar Descompresión Mandibular"}
            </button>
          </div>

          {/* Right: Text descriptions and custom settings */}
          <div className="lg:col-span-7">
            <span className="text-xs font-mono font-bold text-brand-gold tracking-widest uppercase inline-block mb-3">
              MÉTODO DE RELAJACIÓN ACTIVA ATM
            </span>
            <h3 className="font-serif font-semibold text-3xl md:text-4xl text-brand-beige tracking-tight mb-6">
              Desactiva el bruxismo desde <br className="hidden sm:inline" />
              <span className="text-brand-gold">la raíz neuromuscular</span>
            </h3>

            {/* Dynamic Instructional panel with nice animations */}
            <div className="p-6 rounded-2xl bg-brand-charcoal/50 border border-brand-olive-light/10 mb-8 min-h-[160px] flex flex-col justify-center">
              <span className="text-[10px] font-mono text-brand-gold uppercase tracking-widest block mb-1">
                {instruction.sub}
              </span>
              <h4 className={`text-xl font-display font-bold mb-2 transition-all ${instruction.color}`}>
                {instruction.title}
              </h4>
              <p className="text-sm md:text-base text-brand-beige-dark/90 leading-relaxed transition-all">
                {instruction.instruction}
              </p>
            </div>

            {/* Preset Selector Grid */}
            <div className="space-y-4">
              <p className="text-xs font-mono text-brand-beige-dark/50">Elige un ritmo clínico personalizado:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActivePreset(idx);
                      setIsRunning(false);
                    }}
                    className={`p-4 rounded-xl text-left border transition-all duration-300 ${
                      activePreset === idx
                        ? "bg-brand-olive/35 border-brand-gold/45 shadow-inner"
                        : "bg-brand-charcoal/45 border-brand-olive-light/5 hover:border-brand-olive-light/20"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1.5 mb-1">
                      <span className="font-display font-bold text-xs text-brand-beige leading-none">
                        {p.name.split(" (")[0]}
                      </span>
                      <span className="text-[10px] font-mono text-brand-gold shrink-0">
                        ({p.inhale}-{p.hold}-{p.exhale})
                      </span>
                    </div>
                    <p className="text-[10.5px] text-brand-beige-dark/65 leading-snug">
                      {p.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Science facts checklist (StoryBrand credibility) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-brand-olive-light/10">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-display font-semibold text-brand-beige text-xs uppercase tracking-wide">
                    Feedback Trigémino
                  </h5>
                  <p className="text-xs text-brand-beige-dark/65 mt-0.5">
                    Ensanchar el espacio posterior activa una señal que relaja instantáneamente los maseteros.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <HeartPulse className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-display font-semibold text-brand-beige text-xs uppercase tracking-wide">
                    Activación del Nervio Vago
                  </h5>
                  <p className="text-xs text-brand-beige-dark/65 mt-0.5">
                    La exhalación prolongada de 6 segundos activa el sistema parasimpático para apagar la rumiación.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
