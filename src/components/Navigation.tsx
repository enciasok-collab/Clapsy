/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Moon, Menu, X, ChevronRight, Award } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "El Problema", href: "#problema" },
    { label: "El Método Clapsy", href: "#metodo" },
    { label: "Prueba de Sueño", href: "#test" },
    { label: "Dr. Manuel", href: "#fundador" },
    { label: "Ciencia", href: "#ciencia" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <>
      <header
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-brand-charcoal/85 backdrop-blur-xl border-b border-brand-olive-light/10 py-3 shadow-lg shadow-black/10"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="relative w-9 h-9 rounded-xl border border-brand-gold/20 overflow-hidden bg-brand-beige-dark/10 shrink-0 flex items-center justify-center p-0.5">
              <img 
                src="https://i.postimg.cc/xJXhLdHq/clapsy.jpg" 
                alt="clapsy" 
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg leading-none tracking-tight text-brand-beige">
                CLAPSY <span className="text-brand-gold font-light">SLEEP</span>
              </span>
              <span className="text-[9px] text-brand-gold/70 tracking-widest leading-none mt-1 font-mono uppercase">
                Clinical Method
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-8">
            {menuItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="text-sm font-medium text-brand-beige/80 hover:text-brand-gold transition-colors duration-300 relative py-1 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Menu */}
          <div className="hidden lg:flex items-center gap-4">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-brand-olive-dark/40 border border-brand-olive-light/20 rounded-full text-xs font-mono text-brand-beige-dark">
              <Award className="w-3.5 h-3.5 text-brand-gold" /> Método Clínico
            </span>
            <a
              href="#test"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-gold-dark via-brand-gold to-brand-gold-light hover:from-brand-gold hover:to-brand-gold-dark text-brand-charcoal text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-[1.03] shadow-md shadow-brand-gold/10 hover:shadow-brand-gold/20 active:scale-95"
            >
              Comenzar Test Gratuito
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            id="mobile-menu-trigger"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-1.5 text-brand-beige hover:text-brand-gold transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer (Glassmorphism overlay) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[60px] z-40 bg-brand-charcoal/95 backdrop-blur-2xl border-t border-brand-olive-light/10 lg:hidden flex flex-col justify-between p-6 overflow-y-auto pb-10"
          >
            <div className="flex flex-col gap-5 pt-4">
              {menuItems.map((item, idx) => (
                <motion.a
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={idx}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-brand-beige hover:text-brand-gold transition-colors flex items-center justify-between pb-3 border-b border-brand-olive-dark/30"
                >
                  {item.label}
                  <ChevronRight className="w-4 h-4 text-brand-gold" />
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col gap-4 mt-12">
              <div className="flex items-center justify-center gap-2 text-xs font-mono text-brand-beige-dark/70 py-2 border border-brand-olive-light/10 rounded-xl bg-brand-olive-dark/20">
                <Award className="w-4 h-4 text-brand-gold" /> Clínicamente avalado por especialistas
              </div>
              <a
                href="#test"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-4 rounded-xl bg-gradient-to-r from-brand-gold-dark via-brand-gold to-brand-gold-light text-brand-charcoal font-bold tracking-wide shadow-lg shadow-brand-gold/10"
              >
                Comenzar Test Gratuito
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
