/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";

export default function SEOAndMeta() {
  useEffect(() => {
    // 1. Update Document Title and Meta Description
    document.title = "Clapsy Sleep | Recupera tu descanso. Recupera tu vida.";
    
    // Check and set/update meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // SEO Meta Tags
    updateMetaTag("description", "Descubre Clapsy Sleep, el método clínico digital que fusiona neurociencia, medicina maxilofacial y psicología para eliminar el insomnio, aliviar el bruxismo y regular la ansiedad nocturna.");
    updateMetaTag("keywords", "Dormir mejor, insomnio, bruxismo, ansiedad, dormir rápido, sueño profundo, medicina del sueño, tensión mandibular, relajación, mindfulness, estrés nocturno");
    updateMetaTag("author", "Clapsy Sleep");
    updateMetaTag("robots", "index, follow");

    // Open Graph / Facebook Meta Tags
    updateMetaTag("og:title", "Clapsy Sleep | Método Clínico de Descanso y Alivio Mandibular", true);
    updateMetaTag("og:description", "Recupera tu vitalidad. El primer método clínico digital enfocado en la descompresión mandibular, el estrés y la calidad del sueño.", true);
    updateMetaTag("og:type", "website", true);
    updateMetaTag("og:url", window.location.href, true);
    updateMetaTag("og:site_name", "Clapsy Sleep", true);
    // Use picsum or absolute image placeholder if the mock image path is relative
    updateMetaTag("og:image", "https://picsum.photos/seed/clapsysleep/1200/630", true);

    // Twitter Card Meta Tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", "Clapsy Sleep | Recupera tu descanso. Recupera tu vida.");
    updateMetaTag("twitter:description", "Método neurocientífico contra el bruxismo, la tensión mandibular y el insomnio. Creado por especialistas.");
    updateMetaTag("twitter:image", "https://picsum.photos/seed/clapsysleep/1200/630");

    // 2. Inject JSON-LD Schema for Medical Organization and Product
    let schemaScript = document.getElementById("clapsy-seo-schema") as HTMLScriptElement;
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.id = "clapsy-seo-schema";
      schemaScript.type = "application/ld+json";
      document.head.appendChild(schemaScript);
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "MedicalWebPage",
          "@id": window.location.href + "#webpage",
          "url": window.location.href,
          "name": "Clapsy Sleep - Tratamiento Clínico del Insomnio y Bruxismo",
          "description": "Plataforma digital para la mejora del sueño profundo y control del bruxismo nocturno.",
          "isPartOf": {
            "@type": "WebSite",
            "@id": window.location.href + "#website",
            "name": "Clapsy Sleep",
            "url": window.location.href
          },
          "about": [
            {
              "@type": "MedicalCondition",
              "name": "Bruxismo",
              "alternateName": "Rechinamiento de dientes nocturno"
            },
            {
              "@type": "MedicalCondition",
              "name": "Insomnio",
              "alternateName": "Trastorno del sueño"
            },
            {
              "@type": "MedicalCondition",
              "name": "Trastornos de la articulación temporomandibular",
              "alternateName": "Tensión ATM"
            }
          ]
        },
        {
          "@type": "MedicalOrganization",
          "@id": window.location.href + "#organization",
          "name": "Clapsy Sleep",
          "url": window.location.href,
          "logo": "https://picsum.photos/seed/clapsylogo/500/500",
          "founder": {
            "@type": "Person",
            "name": "Dr. Manuel Migueles Rojas",
            "jobTitle": "Especialista en Rehabilitación Oral, Radiología Oral y Maxilofacial",
            "alumniOf": {
              "@type": "EducationalOrganization",
              "name": "Universidad de Chile"
            }
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Support",
            "email": "contacto@clapsysleep.com"
          }
        }
      ]
    };

    schemaScript.textContent = JSON.stringify(schemaData);

    return () => {
      // Clean up script on unmount to prevent duplicate tags
      const currentSchema = document.getElementById("clapsy-seo-schema");
      if (currentSchema) {
        currentSchema.remove();
      }
    };
  }, []);

  return null;
}
