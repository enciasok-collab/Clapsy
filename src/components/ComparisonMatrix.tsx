/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Check, X, ShieldAlert, Award } from "lucide-react";

interface ComparisonRow {
  feature: string;
  description: string;
  clapsy: { yes: boolean; text?: string };
  ferula: { yes: boolean; text?: string };
  meditacion: { yes: boolean; text?: string };
  trackers: { yes: boolean; text?: string };
}

export default function ComparisonMatrix() {
  const rows: ComparisonRow[] = [
    {
      feature: "Descompresión Activa ATM",
      description: "Ejercicios propioceptivos de 3 minutos diseñados para relajar de forma mecánica los músculos maseteros.",
      clapsy: { yes: true, text: "Sí (Exclusivo)" },
      ferula: { yes: false, text: "No (Inmóvil)" },
      meditacion: { yes: false, text: "No" },
      trackers: { yes: false, text: "No" },
    },
    {
      feature: "Regulación Neurológica de la Raíz",
      description: "Bloquea el reflejo trigeminal subconsciente del apretamiento a nivel de tallo cerebral mediante audiofrecuencias calibradas.",
      clapsy: { yes: true, text: "Sí (Método Clínico)" },
      ferula: { yes: false, text: "No (Solo barrera)" },
      meditacion: { yes: true, text: "Parcial (Solo estrés)" },
      trackers: { yes: false, text: "No" },
    },
    {
      feature: "Higiene Respiratoria Nocturna",
      description: "Técnicas de reeducación nasal para evitar que la respiración bucal induzca bruxismo defensivo.",
      clapsy: { yes: true },
      ferula: { yes: false },
      meditacion: { yes: false },
      trackers: { yes: false },
    },
    {
      feature: "Seguimiento Clínico y Soporte IA",
      description: "Chatbot y algoritmos guiados por el Dr. Manuel para responder síntomas de rigidez, dolor y optimizar tu rutina.",
      clapsy: { yes: true, text: "Sí (Personalizado)" },
      ferula: { yes: false },
      meditacion: { yes: false },
      trackers: { yes: true, text: "Solo datos estáticos" },
    },
    {
      feature: "Cero Dispositivos o Sensores Molestos",
      description: "No requiere placas acrílicas que causan dolor dental, anillos apretados, ni bandas de cabeza de $400 USD.",
      clapsy: { yes: true },
      ferula: { yes: false, text: "Placa incómoda" },
      meditacion: { yes: true },
      trackers: { yes: false, text: "Anillo / Reloj" },
    },
    {
      feature: "Relación de Costo / Valor",
      description: "Acceso ilimitado por una fracción del costo de visitas recurrentes al dentista, reemplazo de placas o wearables de lujo.",
      clapsy: { yes: true, text: "Alta (Fácil acceso)" },
      ferula: { yes: false, text: "Baja ($300-$700 USD)" },
      meditacion: { yes: true, text: "Media" },
      trackers: { yes: false, text: "Baja ($300+ Suscripción)" },
    },
  ];

  return (
    <section id="ciencia" className="py-24 md:py-32 bg-brand-charcoal overflow-hidden border-b border-brand-olive-light/5">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Header Title (StoryBrand & Hormozi) */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-xs font-mono font-bold text-brand-gold tracking-widest uppercase inline-flex items-center gap-1.5 px-3.5 py-1 bg-brand-gold/10 border border-brand-gold/20 rounded-full mb-4">
            <ShieldAlert className="w-3.5 h-3.5" /> REPOSICIONAMIENTO CLÍNICO
          </span>
          <h2 className="font-serif font-semibold text-3xl md:text-5xl text-brand-beige tracking-tight mb-5">
            ¿Por qué las férulas y las <br className="hidden sm:inline" />
            <span className="text-brand-gold">apps genéricas no solucionan el problema?</span>
          </h2>
          <p className="font-sans text-brand-beige-dark/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Las férulas acrílicas protegen los dientes pero aumentan el apretamiento reflejo. Las apps tradicionales solo reproducen sonidos. 
            <strong> Clapsy Sleep</strong> es la primera solución digital que trata la causa neuromuscular y de estrés de manera holística.
          </p>
        </div>

        {/* Desktop Comparison Table (Visible on md and up) */}
        <div className="hidden md:block overflow-x-auto rounded-3xl border border-brand-olive-light/10 bg-brand-charcoal-light/35 backdrop-blur-md shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-brand-olive-light/10 bg-brand-olive-dark/10">
                <th className="p-6 text-xs font-mono text-brand-beige-dark/60 uppercase tracking-widest w-1/3">
                  Pilar de Tratamiento
                </th>
                <th className="p-6 text-xs font-mono text-brand-gold uppercase tracking-widest text-center bg-brand-olive-dark/40 border-x border-brand-gold/10">
                  Clapsy Sleep
                </th>
                <th className="p-6 text-xs font-mono text-brand-beige-dark/60 uppercase tracking-widest text-center">
                  Férula de Descarga
                </th>
                <th className="p-6 text-xs font-mono text-brand-beige-dark/60 uppercase tracking-widest text-center">
                  Apps Meditación (Calm)
                </th>
                <th className="p-6 text-xs font-mono text-brand-beige-dark/60 uppercase tracking-widest text-center">
                  Trackers (Oura/8Sleep)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-olive-light/5 text-sm">
              {rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-brand-olive-dark/5 transition-colors">
                  {/* Feature description */}
                  <td className="p-6">
                    <p className="font-display font-semibold text-brand-beige">{row.feature}</p>
                    <p className="text-xs text-brand-beige-dark/70 mt-1 leading-relaxed">{row.description}</p>
                  </td>
                  
                  {/* Clapsy Column */}
                  <td className="p-6 text-center bg-brand-olive-dark/25 border-x border-brand-gold/15">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center mb-1">
                        <Check className="w-4 h-4 stroke-[3px]" />
                      </div>
                      <span className="text-[10.5px] font-mono font-bold text-brand-gold">
                        {row.clapsy.text || "Totalmente"}
                      </span>
                    </div>
                  </td>

                  {/* Férula Column */}
                  <td className="p-6 text-center">
                    <div className="flex flex-col items-center justify-center">
                      {row.ferula.yes ? (
                        <div className="w-6 h-6 rounded-full bg-brand-olive-light/10 text-brand-beige-dark flex items-center justify-center mb-1">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-red-950/20 text-red-400/70 flex items-center justify-center mb-1">
                          <X className="w-3.5 h-3.5" />
                        </div>
                      )}
                      <span className="text-[10px] font-mono text-brand-beige-dark/60">
                        {row.ferula.text || (row.ferula.yes ? "Sí" : "No")}
                      </span>
                    </div>
                  </td>

                  {/* Apps de Meditación */}
                  <td className="p-6 text-center">
                    <div className="flex flex-col items-center justify-center">
                      {row.meditacion.yes ? (
                        <div className="w-6 h-6 rounded-full bg-brand-olive-light/10 text-brand-beige-dark flex items-center justify-center mb-1">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-red-950/20 text-red-400/70 flex items-center justify-center mb-1">
                          <X className="w-3.5 h-3.5" />
                        </div>
                      )}
                      <span className="text-[10px] font-mono text-brand-beige-dark/60">
                        {row.meditacion.text || (row.meditacion.yes ? "Sí" : "No")}
                      </span>
                    </div>
                  </td>

                  {/* Trackers */}
                  <td className="p-6 text-center">
                    <div className="flex flex-col items-center justify-center">
                      {row.trackers.yes ? (
                        <div className="w-6 h-6 rounded-full bg-brand-olive-light/10 text-brand-beige-dark flex items-center justify-center mb-1">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-red-950/20 text-red-400/70 flex items-center justify-center mb-1">
                          <X className="w-3.5 h-3.5" />
                        </div>
                      )}
                      <span className="text-[10px] font-mono text-brand-beige-dark/60">
                        {row.trackers.text || (row.trackers.yes ? "Sí" : "No")}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Accordion/Card-style comparison (Visible on mobile/sm screens) */}
        <div className="md:hidden space-y-4">
          {rows.map((row, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-brand-charcoal-light/60 border border-brand-olive-light/10 space-y-3">
              <div>
                <h4 className="font-display font-bold text-brand-beige text-sm">{row.feature}</h4>
                <p className="text-xs text-brand-beige-dark/60 mt-1 leading-relaxed">{row.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-brand-olive-light/5 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-brand-olive-dark/40 border border-brand-gold/25 text-brand-gold">
                  <p className="text-[9px] text-brand-gold/60 uppercase">Clapsy Sleep</p>
                  <p className="font-bold mt-1 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 stroke-[3px]" /> {row.clapsy.text || "Sí"}
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-brand-charcoal/40 border border-brand-olive-light/5 text-brand-beige-dark">
                  <p className="text-[9px] text-brand-beige-dark/40 uppercase">Férula de Descarga</p>
                  <p className="font-bold mt-1 flex items-center gap-1.5">
                    {row.ferula.yes ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5 text-red-400" />}
                    {row.ferula.text || (row.ferula.yes ? "Sí" : "No")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom micro-copy guaranteeing scientific backing */}
        <div className="mt-12 flex items-center justify-center gap-2 text-xs font-mono text-brand-beige-dark/50">
          <Award className="w-4 h-4 text-brand-gold" /> Basado en descompresión neuromuscular y estudios de fisioterapia de la ATM.
        </div>

      </div>
    </section>
  );
}
