export const ui = {
  en: {
    // Nav
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.experience': 'Experience',
    'nav.contact': 'Contact',
    // Hero
    'hero.badge': 'Senior Frontend Developer',
    'hero.bio':
      'Building scalable frontend systems with React, TypeScript, Web Components, architecture, testing, accessibility, and AI-assisted migration workflows.',
    'hero.cta.projects': 'View Projects',
    'hero.cta.resume': 'Resume',
    'hero.scroll': 'Scroll down',
    // About
    'about.heading': 'About',
    'about.bio':
      'Senior Frontend Developer with 4+ years of experience in frontend architecture, testing and quality. I specialise in React 18+, TypeScript 5+, modular design and modernisation towards Lit and Web Components, applying hexagonal architecture, SOLID and Clean Code. I bring technical judgement to cross-cutting components, code review, mentoring, accessibility and AI agents applied to migrations.',
    'about.resume': 'View Resume',
    'about.download': 'Download PDF',
    // Skills
    'skills.heading': 'Skills',
    'skills.subtitle': 'Senior frontend stack, architecture, testing, accessibility and AI tooling',
    // Projects
    'projects.heading': 'Projects',
    'projects.subtitle': "Things I've built and shipped",
    'projects.liveDemo': 'Live Demo',
    'projects.repo': 'Repository',
    // Experience
    'exp.heading': 'Experience',
    'exp.present': 'Present',
    // Contact
    'contact.btn': 'Contact me',
    'contact.title': 'Get in Touch',
    'contact.subtitle': "I'll get back to you as soon as possible.",
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.success': 'Message sent! Talk soon.',
    'contact.close': 'Close',
    'contact.openLabel': 'Open contact form',
    'contact.err.name': 'Name is required.',
    'contact.err.email': 'Email is required.',
    'contact.err.emailInvalid': 'Please enter a valid email address.',
    'contact.err.message': 'Message is required.',
    'contact.err.generic': 'Something went wrong. Please try again.',
    // Resume page
    'resume.back': 'Back to Portfolio',
    'resume.download': 'Download PDF',
    'resume.summary': 'Summary',
    'resume.experience': 'Experience',
    'resume.education': 'Education',
    'resume.certifications': 'Certifications',
    'resume.skills': 'Skills',
    'resume.contact': 'Contact',
    'resume.languages': 'Languages',
    'resume.print': 'Print',
    // Footer
    'footer.rights': 'All rights reserved.',
  },
  es: {
    // Nav
    'nav.about': 'Sobre mi',
    'nav.skills': 'Habilidades',
    'nav.projects': 'Proyectos',
    'nav.experience': 'Experiencia',
    'nav.contact': 'Contacto',
    // Hero
    'hero.badge': 'Senior Frontend Developer',
    'hero.bio':
      'Construyo sistemas frontend escalables con React, TypeScript, Web Components, arquitectura, testing, accesibilidad y migraciones asistidas por IA.',
    'hero.cta.projects': 'Ver proyectos',
    'hero.cta.resume': 'Curriculum',
    'hero.scroll': 'Desplazate',
    // About
    'about.heading': 'Sobre mi',
    'about.bio':
      'Senior Frontend Developer con mas de 4 anos de experiencia en arquitectura frontend, testing y calidad. Estoy especializado en React 18+, TypeScript 5+, diseno modular y modernizacion hacia Lit y Web Components, aplicando arquitectura hexagonal, SOLID y Clean Code. Aporto criterio tecnico en piezas transversales, code review, mentoring, accesibilidad e IA y agentes aplicados a migraciones.',
    'about.resume': 'Ver Curriculum',
    'about.download': 'Descargar PDF',
    // Skills
    'skills.heading': 'Habilidades',
    'skills.subtitle': 'Stack senior frontend, arquitectura, testing, accesibilidad y tooling con IA',
    // Projects
    'projects.heading': 'Proyectos',
    'projects.subtitle': 'Cosas que he construido y publicado',
    'projects.liveDemo': 'Demo en vivo',
    'projects.repo': 'Repositorio',
    // Experience
    'exp.heading': 'Experiencia',
    'exp.present': 'Presente',
    // Contact
    'contact.btn': 'Contactame',
    'contact.title': 'Ponte en contacto',
    'contact.subtitle': 'Te respondere lo antes posible.',
    'contact.name': 'Nombre',
    'contact.email': 'Correo electronico',
    'contact.message': 'Mensaje',
    'contact.send': 'Enviar mensaje',
    'contact.sending': 'Enviando...',
    'contact.success': 'Mensaje enviado! Hablamos pronto.',
    'contact.close': 'Cerrar',
    'contact.openLabel': 'Abrir formulario de contacto',
    'contact.err.name': 'El nombre es obligatorio.',
    'contact.err.email': 'El correo electronico es obligatorio.',
    'contact.err.emailInvalid': 'Por favor, introduce un correo valido.',
    'contact.err.message': 'El mensaje es obligatorio.',
    'contact.err.generic': 'Algo salio mal. Por favor, intentalo de nuevo.',
    // Resume page
    'resume.back': 'Volver al Portfolio',
    'resume.download': 'Descargar PDF',
    'resume.summary': 'Resumen',
    'resume.experience': 'Experiencia',
    'resume.education': 'Educacion',
    'resume.certifications': 'Certificaciones',
    'resume.skills': 'Habilidades',
    'resume.contact': 'Contacto',
    'resume.languages': 'Idiomas',
    'resume.print': 'Imprimir',
    // Footer
    'footer.rights': 'Todos los derechos reservados.',
  },
} as const;

export type Lang = keyof typeof ui;
export type UIKey = keyof typeof ui.en;

export function useTranslations(lang: Lang) {
  return (key: UIKey): string => ui[lang][key];
}
