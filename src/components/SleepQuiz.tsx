/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ChevronLeft, ShieldCheck, Mail, User, Sparkles, Award, Star, Activity, ArrowRight, Zap } from "lucide-react";
import { QuizQuestion, QuizResultDetails, LeadData } from "../types";

export default function SleepQuiz() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: "", email: "" });
  const [showFullPlan, setShowFullPlan] = useState(false);

  const questions: QuizQuestion[] = [
    {
      id: 1,
      category: "mandibular",
      question: "¿Sientes rigidez, dolor o cansancio en la mandíbula al despertar?",
      description: "La tensión matutina indica bruxismo céntrico o excéntrico durante el sueño profundo.",
      choices: [
        { text: "Nunca. Despierto con la mandíbula totalmente relajada.", score: 0, jawTensionWeight: 0, sleepDisruptionWeight: 0 },
        { text: "Ocasionalmente, en épocas de exámenes o alta carga laboral.", score: 2, jawTensionWeight: 30, sleepDisruptionWeight: 10 },
        { text: "Con frecuencia. Siento la articulación rígida o crujidos ligeros.", score: 4, jawTensionWeight: 65, sleepDisruptionWeight: 20 },
        { text: "Diariamente. Despierto con dolor muscular facial o cefalea sorda.", score: 6, jawTensionWeight: 95, sleepDisruptionWeight: 35 },
      ],
    },
    {
      id: 2,
      category: "sleep",
      question: "¿Cómo calificarías tu facilidad para conciliar y mantener el sueño?",
      description: "El insomnio de conciliación suele relacionarse con hiperactividad simpática (sistema de alerta activo).",
      choices: [
        { text: "Excelente. Me duermo en menos de 15 minutos y no me despierto.", score: 0, jawTensionWeight: 0, sleepDisruptionWeight: 0 },
        { text: "Aceptable. Tardo un poco en conciliar pero duermo de corrido.", score: 2, jawTensionWeight: 10, sleepDisruptionWeight: 30 },
        { text: "Interrumpido. Despierto a las 3-4 AM con la mente acelerada y rumiando.", score: 4, jawTensionWeight: 35, sleepDisruptionWeight: 70 },
        { text: "Grave. Sufro insomnio crónico; conciliar es una batalla diaria.", score: 6, jawTensionWeight: 50, sleepDisruptionWeight: 95 },
      ],
    },
    {
      id: 3,
      category: "mandibular",
      question: "¿Utilizas o te han recomendado una férula de descarga (placa de acrílico)?",
      description: "Las férulas protegen los dientes del desgaste físico, pero no desactivan la señal neurológica del bruxismo.",
      choices: [
        { text: "No la necesito ni me la han recomendado.", score: 0, jawTensionWeight: 0, sleepDisruptionWeight: 0 },
        { text: "Me la recomendaron pero me resulta muy incómoda para dormir.", score: 2, jawTensionWeight: 40, sleepDisruptionWeight: 40 },
        { text: "La uso, pero sigo despertando con fatiga mandibular o dolor de cuello.", score: 4, jawTensionWeight: 75, sleepDisruptionWeight: 30 },
        { text: "La uso a diario y aun así la desgasto, la rompo o amanezco cansado.", score: 6, jawTensionWeight: 90, sleepDisruptionWeight: 45 },
      ],
    },
    {
      id: 4,
      category: "stress",
      question: "¿Cómo respiras habitualmente durante la noche o al despertar?",
      description: "La respiración bucal altera el pH oral, fomenta el bruxismo y disminuye severamente la saturación de oxígeno.",
      choices: [
        { text: "Respiro siempre por la nariz, despierto con la boca hidratada.", score: 0, jawTensionWeight: 0, sleepDisruptionWeight: 0 },
        { text: "A veces ronco levemente o amanezco con la garganta un poco reseca.", score: 2, jawTensionWeight: 20, sleepDisruptionWeight: 35 },
        { text: "Respiro por la boca frecuentemente; amanezco con sequedad extrema.", score: 4, jawTensionWeight: 50, sleepDisruptionWeight: 65 },
        { text: "Tengo apneas diagnosticadas o sospechas de obstrucción respiratoria.", score: 6, jawTensionWeight: 80, sleepDisruptionWeight: 95 },
      ],
    },
    {
      id: 5,
      category: "stress",
      question: "¿Cómo describirías tu nivel de fatiga y cansancio mental durante el día?",
      description: "El cansancio crónico diurno es el indicador directo de una mala arquitectura del sueño (falta de fase delta).",
      choices: [
        { text: "Excelente. Despierto con energía y mantengo el enfoque todo el día.", score: 0, jawTensionWeight: 0, sleepDisruptionWeight: 0 },
        { text: "Moderado. Siento un bajón de energía por la tarde pero es manejable.", score: 2, jawTensionWeight: 15, sleepDisruptionWeight: 40 },
        { text: "Alto. Me cuesta concentrarme y dependo de altas dosis de cafeína.", score: 4, jawTensionWeight: 50, sleepDisruptionWeight: 75 },
        { text: "Extremo. Siento neblina mental constante y un agotamiento insoportable.", score: 6, jawTensionWeight: 70, sleepDisruptionWeight: 95 },
      ],
    },
  ];

  // Answer selection handler
  const handleSelect = (choiceIdx: number) => {
    setAnswers({ ...answers, [currentStep]: choiceIdx });
    // Auto advance with tiny delay
    if (currentStep < questions.length - 1) {
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 350);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Calculate scores and indices
  const calculateResult = (): QuizResultDetails => {
    let totalScore = 0;
    let totalJawWeight = 0;
    let totalSleepWeight = 0;
    let jawCount = 0;
    let sleepCount = 0;

    questions.forEach((q, idx) => {
      const selectedChoiceIdx = answers[idx];
      if (selectedChoiceIdx !== undefined) {
        const choice = q.choices[selectedChoiceIdx];
        totalScore += choice.score;
        totalJawWeight += choice.jawTensionWeight;
        totalSleepWeight += choice.sleepDisruptionWeight;
        if (choice.jawTensionWeight > 0) jawCount++;
        if (choice.sleepDisruptionWeight > 0) sleepCount++;
      }
    });

    const averageJawIndex = jawCount > 0 ? Math.round(totalJawWeight / jawCount) : 10;
    const averageSleepIndex = sleepCount > 0 ? Math.round(totalSleepWeight / sleepCount) : 10;

    if (totalScore >= 19) {
      return {
        title: "Tensión Mandibular Severa y Desgaste Clínico Crónico",
        category: "severe",
        score: totalScore,
        jawTensionIndex: averageJawIndex,
        sleepQualityIndex: averageSleepIndex,
        description: "Tu sistema nervioso se mantiene en un estado de hiperexcitación simpática durante la noche. Esto no solo fragmenta tu arquitectura de sueño profundo, sino que sobrecarga de forma constante los músculos maseteros y la articulación temporomandibular (ATM), desgastando tu dentadura y mermando tu energía vital diurna.",
        physiologicalImplication: "Hipertrofia refleja de los músculos masticatorios, micro-despertares por micro-apneas o bruxismo, y resistencia vagal disminuida.",
        customActionPlan: [
          "Fisioterapia de descompresión mandibular activa 5 minutos antes de dormir.",
          "Sintonización acústica Clapsy de Ruido Marrón + Frecuencias ATM para bloquear el reflejo trigeminal.",
          "Ejercicios de reentrenamiento de respiración nasal consciente para regular el pH y saturación de oxígeno.",
          "Sesión de micro-aprendizaje Clapsy para comprender y reprogramar la rumiación de las 3 AM.",
        ],
      };
    } else if (totalScore >= 9) {
      return {
        title: "Tensión Mandibular Moderada y Alerta del Sueño",
        category: "moderate",
        score: totalScore,
        jawTensionIndex: averageJawIndex,
        sleepQualityIndex: averageSleepIndex,
        description: "Te encuentras en una fase de alerta intermedia. Tu cuerpo canaliza el estrés diurno apretando la mandíbula por la noche, lo que actúa como un micro-despertador fisiológico. Aunque logras dormir, tu fase Delta (sueño profundo reparador) está comprometida, lo que explica tus altibajos de energía.",
        physiologicalImplication: "Tensión acumulada en la cadena muscular anterior, respiración mixta sub-óptima y picos de cortisol nocturno.",
        customActionPlan: [
          "Ritual nocturno de descompresión mandibular Clapsy (3 min).",
          "Audio Binaural Delta de 4Hz mezclado con Lluvia de Medianoche al recostarse.",
          "Reeducación posicional de la lengua (punto de reposo lingual) para ensanchar la vía aérea superior.",
          "Control semanal del índice de rigidez matutina en la app.",
        ],
      };
    } else {
      return {
        title: "Tensión Fisiológica Leve y Sueño Estable",
        category: "mild",
        score: totalScore,
        jawTensionIndex: Math.max(averageJawIndex, 15),
        sleepQualityIndex: Math.max(averageSleepIndex, 10),
        description: "Felicidades. Tu sistema de relajación parasimpático funciona de manera equilibrada y logras desinflamar la tensión diurna adecuadamente. Sin embargo, en picos puntuales de estrés puedes experimentar tensión maxilar leve que disminuye la profundidad de tu descanso.",
        physiologicalImplication: "Tono vagal saludable con respuesta adaptativa al estrés normal.",
        customActionPlan: [
          "Ejercicios de mantenimiento respiratorio nasal (1 min antes de dormir).",
          "Audios opcionales de ruido blanco o marrón de fondo en noches de alta estimulación.",
          "Higiene postural mandibular durante el uso de pantallas diurnas.",
        ],
      };
    }
  };

  const result = calculateResult();

  const handleLeadSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.email) return;

    // Save lead data locally (Cialdini/Hormozi lead capturing)
    const lead: LeadData = {
      name: leadForm.name,
      email: leadForm.email,
      score: result.score,
      jawTension: result.jawTensionIndex,
      sleepQuality: result.sleepQualityIndex,
    };
    
    // Store in localStorage
    const savedLeads = JSON.parse(localStorage.getItem("clapsy_leads") || "[]");
    savedLeads.push(lead);
    localStorage.setItem("clapsy_leads", JSON.stringify(savedLeads));

    setIsSubmitted(true);
    setShowFullPlan(true);
  };

  const isStepAnswered = answers[currentStep] !== undefined;

  return (
    <section id="test" className="relative py-24 md:py-32 bg-brand-charcoal overflow-hidden border-b border-brand-olive-light/5">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-brand-olive-light/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-[300px] h-[300px] rounded-full bg-brand-gold/5 blur-[90px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-8 relative z-10">
        
        {!showFullPlan ? (
          <div>
            {/* Header Content */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-mono font-bold text-brand-gold tracking-widest uppercase inline-flex items-center gap-1.5 px-3 py-1 bg-brand-gold/10 border border-brand-gold/20 rounded-full mb-4">
                <Award className="w-3.5 h-3.5" /> EVALUACIÓN CIENTÍFICA GRATUITA
              </span>
              <h2 className="font-serif font-semibold text-3xl md:text-5xl text-brand-beige tracking-tight mb-4">
                Descubre tu <span className="text-brand-gold">Índice de Tensión Mandibular</span>
              </h2>
              <p className="text-brand-beige-dark/75 text-sm md:text-base leading-relaxed">
                Este test clínico, diseñado bajo supervisión del <strong>Dr. Manuel Migueles Rojas</strong>, 
                evalúa la relación entre tu sobrecarga dental/muscular, tu respiración nocturna y tu nivel de insomnio. 
                Recibe un pre-diagnóstico fisiológico en 90 segundos.
              </p>
            </div>

            {/* Quiz Card */}
            <div className="bg-brand-charcoal-light/75 border border-brand-olive-light/10 rounded-3xl p-6 md:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              
              {/* Progress bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-brand-charcoal-light">
                <div
                  className="h-full bg-gradient-to-r from-brand-gold to-brand-gold-light transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Step indicator */}
              <div className="flex justify-between items-center mb-6 pt-2">
                <span className="text-xs font-mono text-brand-gold tracking-wider uppercase font-bold">
                  Pregunta {currentStep + 1} de {questions.length}
                </span>
                <span className="text-xs font-mono text-brand-beige-dark/50">
                  {questions[currentStep].category === "mandibular" ? "Articulación & ATM" : questions[currentStep].category === "sleep" ? "Arquitectura del Sueño" : "Tono Neurológico"}
                </span>
              </div>

              {/* Question Text */}
              <div className="min-h-[140px] flex flex-col justify-center mb-8">
                <h3 className="text-xl md:text-2xl font-serif text-brand-beige tracking-tight font-medium leading-snug">
                  {questions[currentStep].question}
                </h3>
                {questions[currentStep].description && (
                  <p className="text-xs md:text-sm text-brand-beige-dark/65 font-sans mt-3 border-l-2 border-brand-gold/30 pl-3 italic">
                    {questions[currentStep].description}
                  </p>
                )}
              </div>

              {/* Choices Grid */}
              <div className="grid grid-cols-1 gap-3.5 mb-8">
                {questions[currentStep].choices.map((choice, idx) => {
                  const isSelected = answers[currentStep] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      className={`w-full p-4 md:p-5 rounded-2xl text-left border transition-all duration-300 flex items-center justify-between group ${
                        isSelected
                          ? "bg-brand-olive/35 border-brand-gold text-brand-beige shadow-lg shadow-brand-gold/5"
                          : "bg-brand-charcoal/40 border-brand-olive-light/10 hover:border-brand-gold/30 hover:bg-brand-olive-dark/15 text-brand-beige-dark"
                      }`}
                    >
                      <span className="text-xs md:text-sm font-medium tracking-wide leading-relaxed pr-4">
                        {choice.text}
                      </span>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                          isSelected
                            ? "border-brand-gold bg-brand-gold text-brand-charcoal"
                            : "border-brand-olive-light/30 group-hover:border-brand-gold/70"
                        }`}
                      >
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-brand-charcoal" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Footer navigation */}
              <div className="flex justify-between items-center pt-4 border-t border-brand-olive-light/5">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="px-4 py-2.5 rounded-xl border border-brand-olive-light/10 text-xs font-mono font-medium text-brand-beige-dark hover:text-brand-gold hover:border-brand-gold/30 transition-all flex items-center gap-1.5 disabled:opacity-20 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" /> Anterior
                </button>

                {currentStep === questions.length - 1 ? (
                  <button
                    onClick={() => setShowFullPlan(true)}
                    disabled={!isStepAnswered}
                    className="px-6 py-3 rounded-xl bg-gradient-to-tr from-brand-gold-dark to-brand-gold hover:to-brand-gold-light text-brand-charcoal text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 shadow-md disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
                  >
                    Ver Resultados <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentStep((prev) => prev + 1)}
                    disabled={!isStepAnswered}
                    className="px-4 py-2.5 rounded-xl border border-brand-olive-light/10 text-xs font-mono font-medium text-brand-beige-dark hover:text-brand-gold hover:border-brand-gold/30 transition-all flex items-center gap-1.5 disabled:opacity-20 disabled:cursor-not-allowed"
                  >
                    Siguiente <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>
          </div>
        ) : (
          /* Results and Lead Capture Dashboard */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Header Result summary */}
            <div className="text-center">
              <span className="text-xs font-mono font-bold text-brand-gold tracking-widest uppercase inline-flex items-center gap-1 bg-brand-gold/10 border border-brand-gold/20 rounded-full px-3 py-1 mb-3">
                <Activity className="w-3.5 h-3.5 animate-pulse" /> ANÁLISIS CLÍNICO COMPLETO
              </span>
              <h2 className="font-serif font-semibold text-2xl md:text-4xl text-brand-beige leading-snug">
                Tu Diagnóstico: <span className="text-brand-gold">{result.title}</span>
              </h2>
            </div>

            {/* Diagnostic metrics bento grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Metric 1: Jaw Tension */}
              <div className="bg-brand-charcoal-light/70 border border-brand-olive-light/10 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-display font-bold text-sm tracking-wide text-brand-beige-dark/80">
                    Índice de Rigidez Mandibular (ATM)
                  </h4>
                  <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full font-bold uppercase ${
                    result.jawTensionIndex > 70 ? "bg-red-950/40 text-red-400 border border-red-900/30" : result.jawTensionIndex > 40 ? "bg-amber-950/40 text-amber-400 border border-amber-900/30" : "bg-emerald-950/40 text-emerald-400 border border-emerald-900/30"
                  }`}>
                    {result.jawTensionIndex > 70 ? "Severo" : result.jawTensionIndex > 40 ? "Moderado" : "Leve"}
                  </span>
                </div>

                {/* SVG Gauge */}
                <div className="flex items-center gap-6 my-2">
                  <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="rgba(39, 47, 40, 0.4)" strokeWidth="8" fill="transparent" />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke={result.jawTensionIndex > 70 ? "#ef4444" : result.jawTensionIndex > 40 ? "#f59e0b" : "#10b981"}
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={251.2}
                        strokeDashoffset={251.2 - (251.2 * result.jawTensionIndex) / 100}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <span className="absolute text-xl font-display font-bold text-brand-beige">{result.jawTensionIndex}%</span>
                  </div>
                  <p className="text-xs text-brand-beige-dark/70 leading-relaxed">
                    Mide el nivel de micro-contracciones involuntarias acumuladas en el macetero lateral y articulación temporomandibular durante el sueño.
                  </p>
                </div>
              </div>

              {/* Metric 2: Sleep Disruption */}
              <div className="bg-brand-charcoal-light/70 border border-brand-olive-light/10 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-display font-bold text-sm tracking-wide text-brand-beige-dark/80">
                    Disrupción de la Arquitectura del Sueño
                  </h4>
                  <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full font-bold uppercase ${
                    result.sleepQualityIndex > 70 ? "bg-red-950/40 text-red-400 border border-red-900/30" : result.sleepQualityIndex > 40 ? "bg-amber-950/40 text-amber-400 border border-amber-900/30" : "bg-emerald-950/40 text-emerald-400 border border-emerald-900/30"
                  }`}>
                    {result.sleepQualityIndex > 70 ? "Grave" : result.sleepQualityIndex > 40 ? "Moderada" : "Óptima"}
                  </span>
                </div>

                {/* SVG Gauge */}
                <div className="flex items-center gap-6 my-2">
                  <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="rgba(39, 47, 40, 0.4)" strokeWidth="8" fill="transparent" />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke={result.sleepQualityIndex > 70 ? "#ef4444" : result.sleepQualityIndex > 40 ? "#f59e0b" : "#10b981"}
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={251.2}
                        strokeDashoffset={251.2 - (251.2 * result.sleepQualityIndex) / 100}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <span className="absolute text-xl font-display font-bold text-brand-beige">{result.sleepQualityIndex}%</span>
                  </div>
                  <p className="text-xs text-brand-beige-dark/70 leading-relaxed">
                    Evalúa la fragmentación de la fase Delta y REM por hiperactividad del sistema nervioso simpático y desregulación de la respiración bucal.
                  </p>
                </div>
              </div>

            </div>

            {/* Explanation card */}
            <div className="p-6 md:p-8 rounded-2xl bg-brand-charcoal-light/35 border border-brand-olive-light/10">
              <h4 className="font-display font-bold text-brand-beige text-base md:text-lg mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-gold" /> Análisis Clínico Dr. Manuel Migueles
              </h4>
              <p className="text-sm text-brand-beige-dark/95 leading-relaxed mb-4">
                {result.description}
              </p>
              <div className="text-xs font-mono text-brand-gold/90 bg-brand-gold/5 p-3 rounded-lg border border-brand-gold/10 inline-block">
                <strong>Implicación Fisiológica:</strong> {result.physiologicalImplication}
              </div>
            </div>

            {/* Lead capture wall or Action plan display */}
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-gradient-to-tr from-brand-charcoal-light via-brand-olive-dark/45 to-brand-charcoal-light border-2 border-brand-gold/20 rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-2xl"
                >
                  {/* Subtle decorative visual elements */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-brand-gold/5 blur-2xl pointer-events-none" />
                  
                  <div className="text-center max-w-2xl mx-auto mb-8">
                    <span className="text-[10px] font-mono text-brand-gold font-bold tracking-widest uppercase flex items-center justify-center gap-1 mb-2">
                      <Star className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" /> REGISTRO EXCLUSIVO VIP LISTA DE ESPERA
                    </span>
                    <h3 className="font-serif font-bold text-xl md:text-3xl text-brand-beige">
                      Desbloquea tu Plan de Descompresión de 7 días
                    </h3>
                    <p className="text-xs md:text-sm text-brand-beige-dark/75 mt-2">
                      Introduce tus datos de contacto clínicos para guardar tu perfil, recibir tu rutina detallada por correo redactada por el <strong>Dr. Manuel Migueles</strong>, y asegurar tu acceso prioritario con descuento de fundador a la app <strong>Clapsy Sleep</strong>.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleLeadSubmit} className="max-w-md mx-auto space-y-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-beige-dark/50" />
                      <input
                        type="text"
                        required
                        placeholder="Tu nombre"
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                        className="w-full bg-brand-charcoal/90 border border-brand-olive-light/20 focus:border-brand-gold hover:border-brand-olive-light/40 rounded-xl py-3.5 pl-12 pr-4 text-sm text-brand-beige outline-none transition-all"
                      />
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-beige-dark/50" />
                      <input
                        type="email"
                        required
                        placeholder="Tu correo electrónico principal"
                        value={leadForm.email}
                        onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                        className="w-full bg-brand-charcoal/90 border border-brand-olive-light/20 focus:border-brand-gold hover:border-brand-olive-light/40 rounded-xl py-3.5 pl-12 pr-4 text-sm text-brand-beige outline-none transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-gold-dark via-brand-gold to-brand-gold-light hover:from-brand-gold hover:to-brand-gold-dark text-brand-charcoal font-bold tracking-wide shadow-lg shadow-brand-gold/15 transition-all duration-300 hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2"
                    >
                      <Zap className="w-4 h-4 fill-brand-charcoal" /> Generar Mi Plan Personalizado
                    </button>

                    <p className="text-[10px] text-center text-brand-beige-dark/40 italic">
                      Garantía de privacidad: No compartimos tus datos clínicos. Solo enviamos ciencia del sueño. Puedes darte de baja con 1 clic.
                    </p>
                  </form>
                </motion.div>
              ) : (
                /* Action Plan Reveal (Instant value on-screen after submitting) */
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-brand-charcoal-light/60 border border-brand-gold/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl relative"
                >
                  <div className="absolute top-4 right-4 text-xs font-mono text-brand-gold bg-brand-gold/10 px-2.5 py-1 rounded-full border border-brand-gold/20 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Plan Desbloqueado para {leadForm.name}
                  </div>

                  <h3 className="font-serif font-bold text-xl md:text-2xl text-brand-beige">
                    Tu Plan de Rehabilitación ATM y Descanso (7 Días)
                  </h3>
                  <p className="text-xs md:text-sm text-brand-beige-dark/75 leading-relaxed">
                    Sigue esta secuencia diariamente durante la próxima semana. Tu guía explicativa detallada con videotutoriales ha sido enviada a <strong>{leadForm.email}</strong>.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {result.customActionPlan.map((stepText, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-xl bg-brand-charcoal/50 border border-brand-olive-light/10 flex gap-3.5 items-start"
                      >
                        <div className="w-6 h-6 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center text-xs font-mono font-bold shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <h5 className="font-display font-semibold text-brand-beige text-xs uppercase tracking-wide">
                            Paso {index + 1}
                          </h5>
                          <p className="text-xs text-brand-beige-dark/80 mt-1 leading-relaxed">
                            {stepText}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-brand-olive-dark/25 border border-brand-olive-light/10 mt-6">
                    <div className="text-left">
                      <p className="text-xs font-mono text-brand-gold">FASE DE ENTRADA VIP EXCLUSIVA</p>
                      <p className="text-xs text-brand-beige-dark/70 mt-0.5">
                        Al registrarte, has garantizado un <strong>50% de descuento vitalicio</strong> en Clapsy Sleep al lanzarse en FlutterFlow.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        // Reset quiz state
                        setCurrentStep(0);
                        setAnswers({});
                        setIsSubmitted(false);
                        setShowFullPlan(false);
                      }}
                      className="px-4 py-2.5 rounded-lg border border-brand-olive-light/10 text-xs font-mono font-semibold text-brand-beige hover:border-brand-gold transition-all"
                    >
                      Volver a Evaluar
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        )}

      </div>
    </section>
  );
}
