/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldAlert, BookOpen, Brain, Activity, Compass, MessageSquare, ChevronRight, Sparkles, Smile, ShieldCheck, Moon } from "lucide-react";

interface AppFeature {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  tag: string;
  phoneScreenLayout: {
    title: string;
    sub: string;
    accentColor: string;
    graphicType: "breathing" | "chat" | "equalizer" | "microlearning";
    dataPoints?: string[];
  };
  details: string[];
}

export default function AppScreens() {
  const [activeTab, setActiveTab] = useState<string>("bruxismo");
  const [aiChatInput, setAiChatInput] = useState<string>("");
  const [aiResponse, setAiResponse] = useState<string>(
    "Hola. Soy tu consultor de sueño de Clapsy Sleep. ¿Qué síntoma, dolor mandibular o duda sobre tu descanso te gustaría evaluar hoy?"
  );
  const [isAiLoading, setIsAiLoading] = useState(false);

  const features: AppFeature[] = [
    {
      id: "bruxismo",
      title: "Descompresión de Bruxismo & ATM",
      subtitle: "Fisioterapia mandibular guiada con sensores propioceptivos pasivos.",
      icon: ShieldCheck,
      tag: "ÚNICO EN EL MERCADO",
      phoneScreenLayout: {
        title: "Alivio Mandibular Activo",
        sub: "Fase 2 de 4: Descompresión de Maseteros",
        accentColor: "border-brand-gold bg-brand-gold/10 text-brand-gold",
        graphicType: "breathing",
        dataPoints: ["Tensión inicial: 82% (Alta)", "Maseteros estimulados: Sí", "Siguiente ritual: 22:30"],
      },
      details: [
        "Ejercicios interactivos de 3 minutos guiados por el Dr. Manuel para reeducar la ATM.",
        "Gráficos semanales de rigidez y dolor temporomandibular para monitorear tu progreso.",
        "Prevención del rechinamiento céntrico mediante biofeedback posicional de la lengua.",
      ],
    },
    {
      id: "ansiedad",
      title: "Control de Ansiedad y Rumiación",
      subtitle: "Interrumpe los picos de cortisol y las dudas obsesivas de la medianoche.",
      icon: Brain,
      tag: "TERAPIA COGNITIVA",
      phoneScreenLayout: {
        title: "Apagar Mente Acelerada",
        sub: "Ritual Vagotónico de Emergencia",
        accentColor: "border-brand-beige bg-brand-beige/10 text-brand-beige",
        graphicType: "microlearning",
        dataPoints: ["Ritmo cardíaco: Bajando", "Cortisol basal: Regulado", "Efectividad probada: 94%"],
      },
      details: [
        "Ejercicios SOS de 90 segundos para desacelerar la rumiación a las 3 AM.",
        "Técnicas de re-encuadre cognitivo simplificadas para disolver preocupaciones de trabajo.",
        "Rituales de transición de ondas Beta a Alfa antes de apagar la luz.",
      ],
    },
    {
      id: "sonidos",
      title: "Mixer Acústico Personalizado",
      subtitle: "Audios clínicos formulados con base científica, no solo sonidos de naturaleza.",
      icon: Activity,
      tag: "INGENIERÍA ACÚSTICA",
      phoneScreenLayout: {
        title: "Frecuencias de Laboratorio",
        sub: "Mixer de Ondas Delta y Ruido Marrón",
        accentColor: "border-brand-olive-light bg-brand-olive/15 text-brand-olive-light",
        graphicType: "equalizer",
        dataPoints: ["Oscilador L: 100Hz", "Oscilador R: 104Hz (Delta)", "Enmascaramiento: Activo"],
      },
      details: [
        "Inyección binaural estéreo de 4Hz para forzar la sincronización neuronal del sueño profundo.",
        "Ruido Marrón y Rosa calibrados para ocultar ruidos domésticos y calmar el nervio auditivo.",
        "Frecuencias subsónicas ultra-bajas para inducir relajación miofascial mandibular de fondo.",
      ],
    },
    {
      id: "ia",
      title: "Clapsy Sleep AI Coach",
      subtitle: "Tu consultor maxilofacial y psicólogo del sueño disponible las 24 horas.",
      icon: Sparkles,
      tag: "INTELIGENCIA CLÍNICA",
      phoneScreenLayout: {
        title: "Dr. Manuel AI Assistant",
        sub: "Consultor de Sueño y Bruxismo",
        accentColor: "border-brand-gold bg-brand-gold/5 text-brand-beige",
        graphicType: "chat",
      },
      details: [
        "Consultas instantáneas sobre dolor de oído, rigidez ATM o dolores de cabeza por apretar.",
        "Personalización automática de rutinas según tus respuestas del día anterior.",
        "Explicación simple de la ciencia detrás de cada uno de tus síntomas.",
      ],
    },
  ];

  // AI assistant responses based on the Dr. Manuel's clinical guidelines (no latency, robust, high value)
  const presetQuestions = [
    {
      q: "¿Por qué me duele el cuello y cabeza al despertar?",
      a: "El músculo masetero (masticación) está conectado mediante cadenas miofasciales con la musculatura del cuello (trapecio y esternocleidomastoideo). Cuando bruxas o aprietas los dientes por la noche, sobrecargas la articulación ATM. Esta contracción continua irradia dolor hacia el cuello, la nuca y genera cefalea tensional sorda por la mañana. Clapsy Sleep trata esto liberando el espacio mandibular posterior.",
    },
    {
      q: "¿La férula de acrílico cura el bruxismo?",
      a: "No. La férula de acrílico rígido es un protector físico excelente; evita que desgastes tus dientes. Sin embargo, no detiene la orden neurológica que proviene del cerebro para apretar. De hecho, muchos pacientes aprietan aún más sobre el acrílico. Clapsy Sleep actúa sobre la causa neurológica del bruxismo, reeducando la musculatura facial y regulando el estrés nocturno.",
    },
    {
      q: "¿Cómo ayuda la respiración nasal al sueño?",
      a: "Respirar por la boca colapsa la vía aérea, reduce la oxigenación cerebral y acidifica la saliva, lo que activa el sistema simpático de alerta y desencadena el bruxismo protector. Respirar por la nariz genera óxido nítrico, activa el nervio vago y estabiliza la mandíbula en reposo, permitiéndote entrar en el reparador sueño Delta.",
    },
  ];

  const handlePresetQuestionClick = (q: string, a: string) => {
    setIsAiLoading(true);
    setAiChatInput(q);
    setTimeout(() => {
      setAiResponse(a);
      setIsAiLoading(false);
    }, 450);
  };

  const activeFeature = features.find((f) => f.id === activeTab) || features[0];

  return (
    <section id="pantallas" className="py-24 md:py-32 bg-brand-charcoal overflow-hidden border-b border-brand-olive-light/5">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Header content */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-xs font-mono font-bold text-brand-gold tracking-widest uppercase inline-flex items-center gap-1.5 px-3 py-1 bg-brand-gold/10 border border-brand-gold/20 rounded-full mb-4">
            <Compass className="w-3.5 h-3.5" /> INTERFAZ & FUNCIONES
          </span>
          <h2 className="font-serif font-semibold text-3xl md:text-5xl text-brand-beige tracking-tight mb-5">
            Una experiencia clínica <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-brand-beige to-brand-gold-light">
              diseñada para la transformación
            </span>
          </h2>
          <p className="font-sans text-brand-beige-dark/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Explora las pantallas clave de Clapsy Sleep. Descubre cómo fusionamos un diseño minimalista, 
            inspirado en Apple, con protocolos médicos rigurosos para reeducar tu descanso.
          </p>
        </div>

        {/* Dynamic Display Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Interactive Feature Selector Tabs */}
          <div className="lg:col-span-5 space-y-4">
            {features.map((feature) => {
              const isActive = activeTab === feature.id;
              const IconComponent = feature.icon;
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveTab(feature.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex gap-4 ${
                    isActive
                      ? "bg-brand-charcoal-light border-brand-gold shadow-lg shadow-black/20"
                      : "bg-transparent border-brand-olive-light/5 hover:border-brand-olive-light/20"
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                      isActive
                        ? "bg-brand-gold text-brand-charcoal"
                        : "bg-brand-charcoal-light text-brand-beige-dark border border-brand-olive-light/10"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <div>
                    <span className="text-[9px] font-mono font-bold tracking-widest text-brand-gold block mb-0.5">
                      {feature.tag}
                    </span>
                    <h4 className="font-display font-semibold text-brand-beige text-sm md:text-base">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-brand-beige-dark/70 mt-1 leading-relaxed">
                      {feature.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Visual Device Simulation (Aesthetic Apple Mockup) */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-8 items-center bg-brand-charcoal-light/35 border border-brand-olive-light/10 rounded-3xl p-6 md:p-10 backdrop-blur-xl justify-between">
            
            {/* Interactive Smartphone Container (Tailwind built) */}
            <div className="w-64 h-[480px] rounded-[36px] bg-[#020202] border-4 border-[#2c2e2c] p-2.5 relative shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] shrink-0 overflow-hidden">
              
              {/* Dynamic Inner Device Layout */}
              <div className="w-full h-full rounded-[28px] bg-brand-charcoal overflow-hidden p-4 relative flex flex-col justify-between">
                
                {/* Speaker pill notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full z-20 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#111] mr-1" />
                  <div className="w-5 h-0.5 bg-[#111] rounded-full" />
                </div>

                {/* Device Header */}
                <div className="flex justify-between items-center text-[9px] font-mono text-brand-beige-dark/50 pt-2 z-10">
                  <span>9:41 AM</span>
                  <span className="flex items-center gap-1">
                    <Activity className="w-2.5 h-2.5 text-brand-gold" /> LTE 100%
                  </span>
                </div>

                {/* Simulated Screen Content based on Active Tab */}
                <div className="flex-1 flex flex-col justify-between pt-6 pb-2 z-10 overflow-hidden">
                  
                  {/* Inside Screen Header */}
                  <div>
                    <h5 className="text-[11px] font-mono text-brand-gold tracking-widest uppercase">
                      CLAPSY APP
                    </h5>
                    <h4 className="text-sm font-serif text-brand-beige font-semibold mt-0.5">
                      {activeFeature.phoneScreenLayout.title}
                    </h4>
                    <p className="text-[9px] text-brand-beige-dark/60 mt-0.5 italic">
                      {activeFeature.phoneScreenLayout.sub}
                    </p>
                  </div>

                  {/* Inside Screen Graphic Engine */}
                  <div className="flex-1 flex items-center justify-center my-4 overflow-hidden min-h-[140px]">
                    <AnimatePresence mode="wait">
                      
                      {activeFeature.phoneScreenLayout.graphicType === "breathing" && (
                        <motion.div
                          key="breathing"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          className="flex flex-col items-center"
                        >
                          <div className="w-20 h-20 rounded-full border border-brand-gold bg-brand-gold/10 animate-pulse flex items-center justify-center relative">
                            <Smile className="w-8 h-8 text-brand-gold" />
                            <div className="absolute inset-0 rounded-full border border-brand-gold/30 animate-ping opacity-40" />
                          </div>
                          <span className="text-[10px] text-brand-gold mt-3 font-mono">Ensancha tu ATM...</span>
                        </motion.div>
                      )}

                      {activeFeature.phoneScreenLayout.graphicType === "equalizer" && (
                        <motion.div
                          key="equalizer"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="w-full flex items-center justify-center gap-1 px-4"
                        >
                          {[0.7, 0.3, 0.85, 0.4, 0.95, 0.5, 0.75, 0.3, 0.6].map((h, i) => (
                            <div
                              key={i}
                              className="w-1.5 rounded-full bg-brand-gold transition-all duration-500 animate-bounce"
                              style={{
                                height: `${h * 45}px`,
                                animationDelay: `${i * 0.15}s`,
                                animationDuration: "1.2s"
                              }}
                            />
                          ))}
                        </motion.div>
                      )}

                      {activeFeature.phoneScreenLayout.graphicType === "microlearning" && (
                        <motion.div
                          key="microlearning"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="w-full space-y-2 text-left"
                        >
                          <div className="p-2.5 rounded-xl bg-brand-olive-dark/40 border border-brand-olive-light/10 text-[9.5px] leading-relaxed text-brand-beige-dark">
                            <p className="font-bold text-brand-beige mb-0.5">La Férula no cura:</p>
                            La férula protege tus esmaltes dentales, pero no desactiva la señal motora del estrés. Es hora de reentrenar tu mandíbula.
                          </div>
                          <div className="p-2.5 rounded-xl bg-brand-charcoal-light/60 border border-brand-olive-light/10 text-[9px] leading-relaxed text-brand-beige-dark/70">
                            <strong>Clave:</strong> El nervio trigémino regula el 60% de la tensión de tu cabeza.
                          </div>
                        </motion.div>
                      )}

                      {activeFeature.phoneScreenLayout.graphicType === "chat" && (
                        <motion.div
                          key="chat"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="w-full h-full flex flex-col justify-end text-[9.5px] space-y-2 max-h-[160px]"
                        >
                          {aiChatInput && (
                            <div className="self-end bg-brand-olive/50 border border-brand-olive-light/20 text-brand-beige py-1.5 px-2 rounded-xl max-w-[85%] text-right font-medium">
                              {aiChatInput}
                            </div>
                          )}
                          <div className="self-start bg-brand-charcoal-light border border-brand-olive-light/15 text-brand-beige-dark py-1.5 px-2 rounded-xl max-w-[90%] text-left overflow-y-auto max-h-[100px] leading-relaxed text-[8.5px] font-sans">
                            {isAiLoading ? "Escribiendo..." : aiResponse}
                          </div>
                        </motion.div>
                      )}

                    </AnimatePresence>
                  </div>

                  {/* Inside Screen Bottom Data Points */}
                  {activeFeature.phoneScreenLayout.dataPoints ? (
                    <div className="space-y-1.5">
                      {activeFeature.phoneScreenLayout.dataPoints.map((point, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between text-[8px] font-mono text-brand-beige-dark/60 py-1 border-b border-brand-olive-light/5"
                        >
                          <span>{point.split(": ")[0]}</span>
                          <span className="text-brand-gold">{point.split(": ")[1]}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Default Bottom Nav for simulated App */
                    <div className="flex justify-around items-center border-t border-brand-olive-light/10 pt-2 text-brand-beige-dark/40">
                      <Moon className="w-4 h-4 text-brand-gold" />
                      <Activity className="w-4 h-4" />
                      <MessageSquare className="w-4 h-4" />
                      <Compass className="w-4 h-4" />
                    </div>
                  )}

                </div>

                {/* Safe Area Home Indicator pill */}
                <div className="w-20 h-1 bg-[#222] rounded-full mx-auto mt-1 z-20 shrink-0" />
              </div>
            </div>

            {/* Feature Description Panel */}
            <div className="flex-1 flex flex-col justify-center text-left">
              <span className="text-[10px] font-mono font-bold tracking-widest text-brand-gold uppercase">
                DETALLES DEL MÓDULO
              </span>
              <h3 className="font-serif font-bold text-xl md:text-2xl text-brand-beige mt-1 mb-4 leading-snug">
                {activeFeature.title}
              </h3>
              
              <ul className="space-y-3.5">
                {activeFeature.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-brand-beige-dark/85 leading-relaxed">
                    <ChevronRight className="w-4.5 h-4.5 text-brand-gold shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              {/* Unique interactive AI preview prompt when on IA tab */}
              {activeTab === "ia" && (
                <div className="mt-6 pt-5 border-t border-brand-olive-light/10 space-y-2">
                  <p className="text-[10px] font-mono text-brand-beige-dark/50">Haz clic en una pregunta para probar la IA del Dr. Manuel:</p>
                  <div className="flex flex-col gap-1.5">
                    {presetQuestions.map((pq, idx) => (
                      <button
                        key={idx}
                        onClick={() => handlePresetQuestionClick(pq.q, pq.a)}
                        className="text-left text-[11px] font-medium text-brand-gold hover:text-brand-gold-light bg-brand-gold/5 hover:bg-brand-gold/10 px-3 py-1.5 rounded-lg border border-brand-gold/10 transition-colors flex items-center justify-between"
                      >
                        <span>{pq.q}</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
