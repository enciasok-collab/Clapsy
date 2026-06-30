/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Moon, Sparkles, ShieldCheck, Award, Star, ChevronRight, Activity, Zap, CheckCircle2, HeartPulse, Brain, AlertTriangle } from "lucide-react";

// Modular Imports
import SEOAndMeta from "./components/SEOAndMeta";
import Navigation from "./components/Navigation";
import SoundMixer from "./components/SoundMixer";
import BreathingPacer from "./components/BreathingPacer";
import SleepQuiz from "./components/SleepQuiz";
import AppScreens from "./components/AppScreens";
import DrManuelSection from "./components/DrManuelSection";
import ComparisonMatrix from "./components/ComparisonMatrix";
import FAQSection from "./components/FAQSection";

export default function App() {
  return (
    <div id="landing-page" className="bg-brand-charcoal min-h-screen text-brand-beige relative selection:bg-brand-gold selection:text-brand-charcoal">
      
      {/* 1. Dynamic SEO & JSON-LD Headers */}
      <SEOAndMeta />

      {/* 2. Glassmorphism Navigation Bar */}
      <Navigation />

      {/* 3. Hero Section (Apple & Tesla inspired visual launch) */}
      <section id="hero" className="relative pt-32 pb-24 md:pt-44 md:pb-36 bg-brand-charcoal overflow-hidden border-b border-brand-olive-light/5">
        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-olive-dark/30 via-brand-charcoal/0 to-brand-charcoal/0 pointer-events-none" />
        <div className="absolute -top-40 left-1/4 w-[400px] h-[400px] rounded-full bg-brand-olive-light/10 blur-[130px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] rounded-full bg-brand-gold/5 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Hero Text content */}
            <div className="lg:col-span-7 text-left space-y-6 md:space-y-8">
              {/* Trust Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-olive/20 border border-brand-olive-light/20 text-xs text-brand-beige-dark font-mono uppercase tracking-widest"
              >
                <Award className="w-3.5 h-3.5 text-brand-gold" /> MÉTODO CLÍNICO DIGITAL
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif font-semibold text-4xl sm:text-5xl md:text-6xl text-brand-beige tracking-tight leading-[1.1]"
              >
                Recupera tu descanso. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-brand-beige to-brand-gold-light">
                  Recupera tu vida.
                </span>
              </motion.h1>

              {/* Emotional/Scientific Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-sans text-brand-beige-dark/85 text-base md:text-xl max-w-2xl leading-relaxed"
              >
                El primer método digital que fusiona neurobiología, 
                medicina mandibular (ATM) y relajación cognitiva para apagar el bruxismo, silenciar el insomnio 
                y devolverte tu energía vital diurna.
              </motion.p>

              {/* Hero Call to Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
              >
                <a
                  href="#test"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-gold-dark via-brand-gold to-brand-gold-light hover:from-brand-gold hover:to-brand-gold-dark text-brand-charcoal text-center font-bold tracking-wide transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-brand-gold/15 active:scale-95 flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-brand-charcoal" /> Hacer Test Clínico Gratis
                </a>
                <a
                  href="#metodo"
                  className="px-8 py-4 rounded-xl border border-brand-olive-light/20 hover:border-brand-gold hover:bg-brand-olive-dark/10 text-brand-beige text-center font-semibold tracking-wide transition-all duration-300 active:scale-95 flex items-center justify-center gap-1.5"
                >
                  Descubrir el Método <ChevronRight className="w-4 h-4" />
                </a>
              </motion.div>

              {/* Social Proof Credibility Metrics (Robert Cialdini) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-brand-olive-light/10"
              >
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-2xl md:text-3xl font-display font-bold text-brand-gold">25+</span>
                    <span className="text-xs font-mono text-brand-gold-light">AÑOS</span>
                  </div>
                  <p className="text-[11px] text-brand-beige-dark/60 mt-1 uppercase tracking-wider font-mono">Experiencia clínica</p>
                </div>

                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-2xl md:text-3xl font-display font-bold text-brand-gold">94%</span>
                    <span className="text-xs font-mono text-brand-gold-light">ÉXITO</span>
                  </div>
                  <p className="text-[11px] text-brand-beige-dark/60 mt-1 uppercase tracking-wider font-mono">Alivio mandibular</p>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <div className="flex items-center gap-1 text-brand-gold">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-brand-gold" />
                    ))}
                  </div>
                  <p className="text-[11px] text-brand-beige-dark/60 mt-1.5 uppercase tracking-wider font-mono">Método Científico</p>
                </div>
              </motion.div>
            </div>

            {/* Hero App Screen Graphics Showcase */}
            <div className="lg:col-span-5 flex justify-center items-center relative">
              <div className="absolute w-[400px] h-[400px] rounded-full bg-brand-olive-light/10 blur-[80px] pointer-events-none" />
              
              {/* Premium floated device container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-72 md:w-80 h-[520px] md:h-[580px] rounded-[48px] bg-brand-charcoal border-4 border-brand-olive-light/15 p-3 shadow-[0_35px_80px_-15px_rgba(0,0,0,0.85)] overflow-hidden animate-float"
              >
                <img
                  src="/src/assets/images/clapsy_app_mockup_1782773774411.jpg"
                  alt="Clapsy Sleep Premium Mobile App UI"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-[36px]"
                />
              </motion.div>

              {/* Decorative side badge (float effect) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -right-4 top-1/4 bg-brand-charcoal-light/95 border border-brand-gold/30 p-4 rounded-2xl shadow-xl max-w-[160px] backdrop-blur-md hidden md:block z-20 text-left"
              >
                <div className="flex items-center gap-1.5 text-brand-gold">
                  <Moon className="w-4 h-4" />
                  <span className="text-[10px] font-mono tracking-wider font-bold uppercase">Clapsy Sleep</span>
                </div>
                <p className="text-[11px] text-brand-beige font-semibold mt-1.5 leading-snug">
                  Dientes separados, mandíbula suelta.
                </p>
                <p className="text-[9px] text-brand-beige-dark/50 font-mono mt-1">
                  — Prescripción Clínica
                </p>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Problem & Empathy Section (El Ciclo de Agotamiento y Tensión) */}
      <section id="problema" className="py-24 md:py-32 bg-brand-charcoal-light/30 border-b border-brand-olive-light/5 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          
          {/* Section title */}
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <span className="text-xs font-mono font-bold text-red-400 tracking-widest uppercase inline-flex items-center gap-1.5 px-3 py-1 bg-red-950/20 border border-red-900/30 rounded-full mb-4">
              <AlertTriangle className="w-3.5 h-3.5" /> EL CICLO SILENCIOSO
            </span>
            <h2 className="font-serif font-semibold text-3xl md:text-5xl text-brand-beige tracking-tight mb-5">
              Por qué amanecer cansado <br className="hidden sm:inline" />
              <span className="text-red-400">no es falta de horas de sueño</span>
            </h2>
            <p className="font-sans text-brand-beige-dark/85 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Someter tu mente a altos niveles de estrés laboral obliga a tu sistema de defensa subconsciente a apretar los dientes (bruxismo). 
              Esto desata un círculo destructivo que fragmenta tu descanso de raíz.
            </p>
          </div>

          {/* Bento-style pain point grids */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="p-6 md:p-8 rounded-2xl bg-brand-charcoal/40 border border-brand-olive-light/5 text-left flex flex-col justify-between space-y-6">
              <div className="w-10 h-10 rounded-xl bg-red-950/20 text-red-400 border border-red-900/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-brand-beige text-base md:text-lg">
                  Tensión Mandibular al Despertar
                </h4>
                <p className="text-xs md:text-sm text-brand-beige-dark/70 mt-2 leading-relaxed">
                  Despiertas con rigidez, dolores de cabeza sordos o dolores de oído. Tu músculo masetero trabajó toda la noche con hasta 120 kg de fuerza.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-6 md:p-8 rounded-2xl bg-brand-charcoal/40 border border-brand-olive-light/5 text-left flex flex-col justify-between space-y-6">
              <div className="w-10 h-10 rounded-xl bg-red-950/20 text-red-400 border border-red-900/10 flex items-center justify-center">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-brand-beige text-base md:text-lg">
                  Mente Acelerada a las 3 AM
                </h4>
                <p className="text-xs md:text-sm text-brand-beige-dark/70 mt-2 leading-relaxed">
                  Te despiertas súbitamente con preocupaciones laborales y rumiación obsesiva. Tu sistema de alerta simpático está secuestrado por el cortisol.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-6 md:p-8 rounded-2xl bg-brand-charcoal/40 border border-brand-olive-light/5 text-left flex flex-col justify-between space-y-6">
              <div className="w-10 h-10 rounded-xl bg-red-950/20 text-red-400 border border-red-900/10 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-brand-beige text-base md:text-lg">
                  Sueño Profundo Delta Bloqueado
                </h4>
                <p className="text-xs md:text-sm text-brand-beige-dark/70 mt-2 leading-relaxed">
                  Aunque duermas 8 horas, te levantas arrastrándote y dependes del café. El apretamiento dental constante fragmenta las ondas lentas reparadoras.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="p-6 md:p-8 rounded-2xl bg-brand-charcoal/40 border border-brand-olive-light/5 text-left flex flex-col justify-between space-y-6">
              <div className="w-10 h-10 rounded-xl bg-red-950/20 text-red-400 border border-red-900/10 flex items-center justify-center">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-brand-beige text-base md:text-lg">
                  La Férula no cura la causa
                </h4>
                <p className="text-xs md:text-sm text-brand-beige-dark/70 mt-2 leading-relaxed">
                  La placa acrílica evita que desgastes el esmalte dental, pero actúa como un yeso: no soluciona el origen neurológico del bruxismo ni del estrés.
                </p>
              </div>
            </div>

          </div>

          {/* Dr Manuel Insight Banner */}
          <div className="mt-16 p-6 md:p-8 rounded-2xl bg-brand-charcoal-light/80 border border-brand-olive-light/15 flex flex-col md:flex-row items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center shrink-0">
              <Award className="w-7 h-7" />
            </div>
            <div className="text-left space-y-1">
              <p className="text-xs font-mono font-bold text-brand-gold uppercase tracking-wider">LA PERSPECTIVA CIENTÍFICA</p>
              <p className="text-sm md:text-base text-brand-beige leading-relaxed font-serif italic">
                “El bruxismo no es una enfermedad dental, es una respuesta neurológica y neuromuscular. 
                Tratar el bruxismo solo con férulas rígidas es como tratar la ansiedad solo recomendando un casco.”
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Breathing Pacer Section (Anatomical Decompression) */}
      <BreathingPacer />

      {/* 6. Sound Frequency Mixer Section (Neuroscience Frequencies) */}
      <SoundMixer />

      {/* 7. Sleep & Tension Assessment Section (Lead Capture & Diagnostics) */}
      <SleepQuiz />

      {/* 8. App Showcase & Simulated AI Coach Tour Section */}
      <AppScreens />

      {/* 9. Scientific Comparison Matrix */}
      <ComparisonMatrix />

      {/* 10. Dr. Manuel Biography & Credentials */}
      <DrManuelSection />

      {/* 11. FAQ Accordions */}
      <FAQSection />

      {/* 12. Final Call to Action Urgency (StoryBrand and Alex Hormozi) */}
      <section id="final-cta" className="relative py-24 md:py-32 bg-brand-charcoal overflow-hidden border-t border-brand-olive-light/5 text-center">
        {/* Decorative ambient flares */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-olive-dark/15 blur-[130px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-[300px] h-[300px] rounded-full bg-brand-gold/5 blur-[90px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 md:px-8 relative z-10 space-y-8">
          
          <span className="text-xs font-mono font-bold text-brand-gold tracking-widest uppercase inline-flex items-center gap-1.5 px-3.5 py-1 bg-brand-gold/10 border border-brand-gold/20 rounded-full">
            <Sparkles className="w-3.5 h-3.5" /> BENEFICIO FUNDADOR LIMITADO
          </span>

          <h2 className="font-serif font-semibold text-4xl md:text-6xl text-brand-beige tracking-tight max-w-3xl mx-auto leading-tight">
            Desactiva tu tensión. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-brand-beige to-brand-gold-light">
              Despierta con vitalidad.
            </span>
          </h2>

          <p className="font-sans text-brand-beige-dark/85 text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
            Únete hoy a las más de 3,400 personas que han tomado el control de su descanso. 
            Regístrate de forma gratuita en nuestra lista de espera exclusiva para asegurar tu <strong>descuento de por vida del 50%</strong> 
            en el lanzamiento de Clapsy Sleep en FlutterFlow.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4 max-w-md mx-auto">
            <a
              href="#test"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-brand-gold-dark via-brand-gold to-brand-gold-light hover:from-brand-gold hover:to-brand-gold-dark text-brand-charcoal text-center font-bold tracking-wide transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-brand-gold/15 flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-brand-charcoal" /> Hacer Mi Evaluación Gratuita
            </a>
          </div>

          <p className="text-xs font-mono text-brand-gold/80 pt-2">
            *Cupos de descuento de fundador limitados a los primeros 500 registros.
          </p>

          {/* Checklist of guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 max-w-3xl mx-auto text-left border-t border-brand-olive-light/5">
            <div className="flex items-center gap-2.5 text-xs text-brand-beige-dark/80">
              <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
              <span>Garantía de rigor clínico</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-brand-beige-dark/80">
              <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
              <span>Sin dispositivos adicionales</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-brand-beige-dark/80">
              <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
              <span>Baja de lista con 1 solo clic</span>
            </div>
          </div>

        </div>
      </section>

      {/* 13. Footer Section with Medical Disclaimer (Trust compliance) */}
      <footer className="bg-brand-charcoal-light py-16 px-6 md:px-8 border-t border-brand-olive-light/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start pb-12 border-b border-brand-olive-light/10">
            
            {/* Column 1: Brand & Logo */}
            <div className="md:col-span-5 space-y-4 text-left">
              <a href="#" className="flex items-center gap-2 group">
                <div className="w-9 h-9 rounded-xl border border-brand-gold/20 overflow-hidden bg-brand-beige-dark/10 flex items-center justify-center p-0.5 shrink-0">
                  <img 
                    src="https://i.postimg.cc/xJXhLdHq/clapsy.jpg" 
                    alt="clapsy" 
                    className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-lg leading-none text-brand-beige">
                    CLAPSY <span className="text-brand-gold font-light">SLEEP</span>
                  </span>
                  <span className="text-[9px] text-brand-gold/70 tracking-widest mt-1 font-mono uppercase">
                    Clinical Method
                  </span>
                </div>
              </a>
              <p className="text-xs text-brand-beige-dark/70 max-w-sm leading-relaxed">
                La primera plataforma digital que fusiona medicina maxilofacial, neurología y psicología 
                para reeducar tu descanso neuromuscular y eliminar las causas de dolor de cabeza, tensión mandibular e insomnio.
              </p>
            </div>

            {/* Column 2: Legal Anchors */}
            <div className="md:col-span-3 text-left">
              <h5 className="font-mono text-xs font-bold text-brand-gold uppercase tracking-wider mb-4">LEGAL</h5>
              <ul className="space-y-2.5 text-xs text-brand-beige-dark/70">
                <li><a href="#" className="hover:text-brand-gold transition-colors">Términos y Condiciones</a></li>
                <li><a href="#" className="hover:text-brand-gold transition-colors">Política de Privacidad</a></li>
                <li><a href="#" className="hover:text-brand-gold transition-colors">Consentimiento Clínico</a></li>
                <li><a href="#" className="hover:text-brand-gold transition-colors">Contacto de Soporte</a></li>
              </ul>
            </div>

            {/* Column 3: Contact & Founder Anchor */}
            <div className="md:col-span-4 text-left space-y-4">
              <h5 className="font-mono text-xs font-bold text-brand-gold uppercase tracking-wider">CONTACTO CLÍNICO</h5>
              <p className="text-xs text-brand-beige-dark/70 leading-relaxed">
                Para consultas corporativas, derivación de pacientes dentales o dudas clínicas:
              </p>
              <div className="text-xs font-mono">
                <a href="mailto:contacto@clapsysleep.com" className="text-brand-gold hover:underline block">
                  contacto@clapsysleep.com
                </a>
                <span className="text-brand-beige-dark/40 block mt-1">Santiago, Chile</span>
              </div>
            </div>

          </div>

          {/* Medical Disclaimer & Copyrights */}
          <div className="pt-8 text-left space-y-4">
            <div className="p-4 rounded-xl bg-brand-charcoal/50 border border-brand-olive-light/5 text-[10.5px] text-brand-beige-dark/60 leading-relaxed max-w-5xl">
              <strong>Aviso Médico Legal Importante:</strong> El contenido, test, cuestionarios y ejercicios presentados en Clapsy Sleep 
              tienen fines educativos e informativos y no sustituyen el diagnóstico, asesoramiento o tratamiento dental, maxilofacial, médico o psiquiátrico profesional. 
              Si padeces dolor agudo persistente, sospechas de apneas de sueño obstructivas graves o pérdida ósea dental severa, 
              te recomendamos encarecidamente agendar una consulta presencial con el Dr. Manuel Migueles o un profesional de la salud de tu elección. 
              El uso de este sitio web y el registro en la lista de espera constituye la aceptación de nuestros términos y políticas de datos.
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center text-[11px] text-brand-beige-dark/40 font-mono gap-4">
              <span>
                © {new Date().getFullYear()} Clapsy Sleep. Todos los derechos reservados.
              </span>
              <span className="flex items-center gap-1.5">
                Desarrollado bajo supervisión del Dr. Manuel Migueles Rojas
              </span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
