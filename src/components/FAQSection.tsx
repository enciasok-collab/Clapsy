/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle, Award } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "¿Qué es Clapsy Sleep y en qué se diferencia de una app de sonidos relajantes como Calm?",
      answer: "A diferencia de las apps convencionales que solo reproducen música o ruidos estáticos, Clapsy Sleep es un método clínico digital integral. Fue diseñado por el especialista maxilofacial Dr. Manuel Migueles Rojas y combina fisioterapia activa de la articulación ATM, sintonización de ondas binaurales para silenciar el reflejo cerebral del rechinamiento, reeducación respiratoria nasal para inducir el estado vagal y micro-aprendizajes cognitivos para disolver el estrés nocturno.",
    },
    {
      question: "¿Debo dejar de usar mi férula de descarga acrílica al usar Clapsy Sleep?",
      answer: "No es necesario que la dejes de inmediato. La férula tiene un valor protector excelente para tus dientes (evita fracturas). Sin embargo, al iniciar con Clapsy Sleep notarás que la necesidad fisiológica de apretar disminuye drásticamente. Nuestro objetivo a mediano plazo es reeducar tus músculos masticatorios para que puedas despertar relajado y libre de rigidez articular, utilizando la férula únicamente como una medida de seguridad pasiva, no como tu única cura.",
    },
    {
      question: "¿En cuánto tiempo empezaré a notar alivio en mi tensión de mandíbula y cuello?",
      answer: "La mayoría de nuestros usuarios experimentan una reducción notable en la rigidez mandibular y dolor de cabeza matutino tras los primeros 3 a 5 días de realizar el 'Ritual de Descompresión Mandibular Activa' antes de dormir. El reentrenamiento neurológico profundo toma cerca de 21 días para consolidar una nueva arquitectura de descanso.",
    },
    {
      question: "¿Cómo funciona la IA del Dr. Manuel dentro de la aplicación?",
      answer: "Nuestra inteligencia artificial (Clapsy AI Sleep Coach) ha sido entrenada bajo la supervisión clínica del Dr. Manuel Migueles Rojas. Funciona analizando tus respuestas diarias de rigidez, nivel de estrés laboral y horas de sueño para autoadaptar tu rutina nocturna. Además, puedes preguntarle cualquier duda sobre tus síntomas (dolor de oído, ATM, click articular, etc.) y te proporcionará orientación terapéutica instantánea basada en el método clínico.",
    },
    {
      question: "Soy un ejecutivo/médico con niveles de estrés laboral extremos, ¿este método realmente me funcionará?",
      answer: "Sí, es precisamente nuestro cliente ideal. Los profesionales con alta responsabilidad acumulan tensión en la corteza prefrontal durante el día, la cual se descarga de noche activando el sistema nervioso simpático (alerta). Clapsy Sleep utiliza el 'bloqueo del nervio trigémino' y la activación vagal mediante respiración modulada 4-4-6, apagando biológicamente ese estado de alerta para que tu cerebro pueda entrar directamente en la fase de sueño profundo Delta.",
    },
    {
      question: "¿El método Clapsy Sleep está respaldado científicamente?",
      answer: "Absolutamente. El método se fundamenta en tres pilares de medicina basada en evidencia: 1) Fisioterapia y descompresión miofascial de la ATM; 2) Sincronización acústica de frecuencias binaurales delta clínicamente validadas para alterar ondas cerebrales; y 3) Reentrenamiento respiratorio nasal y terapia cognitivo-conductual para el insomnio (TCC-I), considerada el estándar de oro por la Academia Americana de Medicina del Sueño.",
    },
  ];

  const handleToggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 md:py-32 bg-brand-charcoal-light/20 relative border-b border-brand-olive-light/5">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold text-brand-gold tracking-widest uppercase inline-flex items-center gap-1.5 px-3 py-1 bg-brand-gold/10 border border-brand-gold/20 rounded-full mb-4">
            <HelpCircle className="w-3.5 h-3.5" /> RESOLVIENDO TUS DUDAS
          </span>
          <h2 className="font-serif font-semibold text-3xl md:text-5xl text-brand-beige tracking-tight mb-5">
            Preguntas <span className="text-brand-gold">Frecuentes</span>
          </h2>
          <p className="font-sans text-brand-beige-dark/75 text-sm md:text-base leading-relaxed">
            Queremos que tomes una decisión informada y respaldada por la ciencia. 
            Si tienes dudas sobre el método del Dr. Manuel o el funcionamiento de la app, aquí tienes las respuestas.
          </p>
        </div>

        {/* Accordions Container */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border transition-all duration-300 overflow-hidden bg-brand-charcoal-light/40 border-brand-olive-light/5 hover:border-brand-olive-light/20"
              >
                {/* Trigger Button */}
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full text-left p-6 flex justify-between items-center gap-4 transition-colors group"
                >
                  <span className="font-display font-semibold text-sm md:text-base text-brand-beige group-hover:text-brand-gold transition-colors leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-brand-charcoal border border-brand-olive-light/10 flex items-center justify-center text-brand-beige transition-transform duration-300 shrink-0 group-hover:border-brand-gold/30 ${
                      isOpen ? "rotate-180 text-brand-gold" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Animated Answer panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-xs md:text-sm text-brand-beige-dark/85 leading-relaxed border-t border-brand-olive-light/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Call to action at bottom of FAQ */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-brand-charcoal/50 border border-brand-olive-light/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-display font-semibold text-brand-beige text-sm md:text-base">
              ¿Tienes una duda médica específica?
            </h4>
            <p className="text-xs text-brand-beige-dark/70 mt-0.5">
              Nuestro equipo clínico y el Dr. Manuel Migueles te responderán directamente por correo electrónico.
            </p>
          </div>
          <a
            href="mailto:contacto@clapsysleep.com"
            className="px-5 py-2.5 rounded-xl border border-brand-gold/30 hover:border-brand-gold text-brand-gold text-xs font-mono font-bold tracking-wider uppercase transition-all"
          >
            Enviar Consulta Médica
          </a>
        </div>

      </div>
    </section>
  );
}
