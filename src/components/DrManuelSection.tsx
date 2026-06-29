/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Award, GraduationCap, Calendar, Users, ClipboardList, Quote } from "lucide-react";

export default function DrManuelSection() {
  const credentials = [
    {
      icon: GraduationCap,
      title: "Cirujano Dentista Especialista",
      desc: "Especialización de Postgrado en Radiología Oral y Maxilofacial y en Rehabilitación Oral.",
    },
    {
      icon: Users,
      title: "Profesor Universitario",
      desc: "Formando a las siguientes generaciones de especialistas en medicina dental y desórdenes craneomandibulares.",
    },
    {
      icon: Calendar,
      title: "Más de 25 Años de Práctica",
      desc: "Miles de pacientes tratados exitosamente en consulta clínica de alta complejidad maxilar.",
    },
    {
      icon: ClipboardList,
      title: "Investigador Clínico",
      desc: "Décadas estudiando la correlación directa entre el estrés vegetativo, la vía aérea obstruida y el bruxismo nocturno.",
    },
  ];

  return (
    <section id="fundador" className="py-24 md:py-32 bg-brand-charcoal-light/20 relative overflow-hidden border-b border-brand-olive-light/5">
      {/* Background radial soft light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-olive-dark/15 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Editorial Typography & Background story */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono font-bold text-brand-gold tracking-widest uppercase inline-flex items-center gap-1.5 px-3.5 py-1 bg-brand-gold/10 border border-brand-gold/20 rounded-full">
              <Award className="w-3.5 h-3.5" /> EL RESPALDO CLÍNICO DETRÁS DE CLAPSY
            </span>
            
            <h2 className="font-serif font-semibold text-3xl md:text-5xl text-brand-beige tracking-tight leading-tight">
              De la consulta maxilofacial <br />
              <span className="text-brand-gold">a un método diario en tu mano</span>
            </h2>

            <div className="space-y-4 font-sans text-brand-beige-dark/90 text-sm md:text-base leading-relaxed">
              <p>
                Durante mis más de 25 años de carrera como especialista en <strong>Rehabilitación Oral y Radiología Maxilofacial</strong>, 
                vi cómo se repetía el mismo patrón en mi sillón clínico: pacientes con fisuras dentales severas, dolor articular insoportable en la ATM, 
                gargantas inflamadas y un agotamiento mental crónico que desgastaba sus vidas.
              </p>
              
              <p className="border-l-2 border-brand-gold/40 pl-4 py-1 italic text-brand-beige font-serif">
                “La férula de descarga rígida clásica protege los dientes de la fricción, pero actúa como un yeso en una pierna: no reeduca, no cura la causa neuromuscular. 
                El bruxismo nace en el cerebro, alimentado por el estrés vegetativo y la mala oxigenación nocturna.”
              </p>

              <p>
                La medicina convencional trata el síntoma, pero ignora la raíz del problema. 
                Por eso nace <strong>Clapsy Sleep</strong>. He vertido décadas de estudio en anatomía maxilofacial, neurobiología del estrés y respiración 
                en un método digital dinámico, que cualquier profesional o persona estresada puede seguir en 5 minutos diarios para desactivar la sobrecarga mandibular 
                y restaurar de forma definitiva su arquitectura de descanso.
              </p>
            </div>

            <div className="pt-4">
              <h4 className="font-serif text-lg font-bold text-brand-beige leading-none">
                Dr. Manuel Migueles Rojas
              </h4>
              <p className="text-xs font-mono text-brand-gold/80 mt-1 uppercase tracking-wider">
                Fundador de Clapsy Sleep · Cirujano Dentista Especialista
              </p>
            </div>
          </div>

          {/* Right Side: Portrait Image with premium gold framework */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-2xl border-2 border-brand-olive-light/20 p-2.5 bg-brand-charcoal">
              
              {/* Golden frame accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-gold rounded-tl-xl z-20" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-gold rounded-br-xl z-20" />

              {/* Photo */}
              <img
                src="/src/assets/images/dr_manuel_portrait_1782773790193.jpg"
                alt="Dr. Manuel Migueles Rojas, Fundador de Clapsy Sleep"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-xl grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />
            </div>

            {/* Micro-statement under the photo */}
            <div className="mt-4 flex items-center gap-1.5 px-3 py-1 bg-brand-olive-dark/40 border border-brand-olive-light/20 rounded-full text-[11px] text-brand-beige-dark/80 font-mono">
              <Quote className="w-3 h-3 text-brand-gold" /> 25+ años de experiencia clínica maxilofacial
            </div>
          </div>

        </div>

        {/* Credentials Bento Grid below (Cialdini proofing) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {credentials.map((cred, idx) => {
            const Icon = cred.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-brand-charcoal-light/60 border border-brand-olive-light/10 text-left hover:border-brand-gold/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 border border-brand-gold/20 text-brand-gold flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-display font-semibold text-brand-beige text-sm md:text-base tracking-tight mb-2">
                  {cred.title}
                </h4>
                <p className="text-xs text-brand-beige-dark/70 leading-relaxed">
                  {cred.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
