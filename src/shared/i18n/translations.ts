export const ui = {
  en: {
    // Nav
    'nav.about':      'About',
    'nav.skills':     'Skills',
    'nav.projects':   'Projects',
    'nav.experience': 'Experience',
    'nav.contact':    'Contact',
    // Hero
    'hero.badge':         'Frontend Engineer',
    'hero.bio':           'Turning legacy banking monoliths into scalable Web Component systems — one migration at a time.',
    'hero.cta.projects':  'View Projects',
    'hero.cta.resume':    'Resume',
    'hero.scroll':        'Scroll down',
    // About
    'about.heading': 'About',
    'about.bio':     'Frontend Engineer with 3+ years at BBVA Technology, contributing to the migration of a large-scale banking app from Ember.js to Web Components (Lit). Active in performance optimisation and mentoring. Our team leveraged AI tools and models (GitHub Copilot, Cursor, Codex) to automate component migration and speed up repetitive tasks. Fluent in Spanish and English.',
    'about.resume':  'View Resume',
    'about.download': 'Download PDF',
    // Skills
    'skills.heading':  'Skills',
    'skills.subtitle': 'Technologies I work with',
    // Projects
    'projects.heading':  'Projects',
    'projects.subtitle': "Things I've built and shipped",
    'projects.liveDemo': 'Live Demo',
    'projects.repo':     'Repository',
    // Experience
    'exp.heading': 'Experience',
    'exp.present': 'Present',
    // Contact
    'contact.btn':          'Contact me',
    'contact.title':        'Get in Touch',
    'contact.subtitle':     "I'll get back to you as soon as possible.",
    'contact.name':         'Name',
    'contact.email':        'Email',
    'contact.message':      'Message',
    'contact.send':         'Send Message',
    'contact.sending':      'Sending…',
    'contact.success':      'Message sent! Talk soon.',
    'contact.close':        'Close',
    'contact.openLabel':    'Open contact form',
    'contact.err.name':          'Name is required.',
    'contact.err.email':         'Email is required.',
    'contact.err.emailInvalid':  'Please enter a valid email address.',
    'contact.err.message':       'Message is required.',
    'contact.err.generic':       'Something went wrong. Please try again.',
    // Metrics
    'metrics.heading':      'Impact in numbers',
    'metrics.subtitle':     'Concrete results behind the work.',
    'metrics.available':    'Open to new projects',
    // Resume page
    'resume.back':        '← Back to Portfolio',
    'resume.download':    'Download PDF',
    'resume.summary':     'Summary',
    'resume.experience':  'Experience',
    'resume.education':   'Education',
    'resume.skills':      'Skills',
    'resume.contact':     'Contact',
    'resume.languages':   'Languages',
    'resume.print':       'Print',
    // Footer
    'footer.rights': 'All rights reserved.',
  },
  es: {
    // Nav
    'nav.about':      'Sobre mí',
    'nav.skills':     'Habilidades',
    'nav.projects':   'Proyectos',
    'nav.experience': 'Experiencia',
    'nav.contact':    'Contacto',
    // Hero
    'hero.badge':         'Ingeniero Frontend',
    'hero.bio':           'Transformando monolitos bancarios heredados en sistemas de Web Components escalables — una migración a la vez.',
    'hero.cta.projects':  'Ver proyectos',
    'hero.cta.resume':    'Currículum',
    'hero.scroll':        'Desplázate',
    // About
    'about.heading': 'Sobre mí',
    'about.bio':     'Ingeniero Frontend con más de 3 años en BBVA Technology, contribuyendo junto al equipo a la migración de una aplicación bancaria a gran escala de Ember.js a Web Components (Lit). Activo en optimización del rendimiento y mentoría. El equipo utilizó herramientas y modelos de IA (GitHub Copilot, Cursor, Codex) para automatizar la migración de componentes y acelerar tareas repetitivas. Bilingüe en español e inglés.',
    'about.resume':  'Ver Currículum',
    'about.download': 'Descargar PDF',
    // Skills
    'skills.heading':  'Habilidades',
    'skills.subtitle': 'Tecnologías con las que trabajo',
    // Projects
    'projects.heading':  'Proyectos',
    'projects.subtitle': 'Cosas que he construido y publicado',
    'projects.liveDemo': 'Demo en vivo',
    'projects.repo':     'Repositorio',
    // Experience
    'exp.heading': 'Experiencia',
    'exp.present': 'Presente',
    // Contact
    'contact.btn':          'Contáctame',
    'contact.title':        'Ponte en contacto',
    'contact.subtitle':     'Te responderé lo antes posible.',
    'contact.name':         'Nombre',
    'contact.email':        'Correo electrónico',
    'contact.message':      'Mensaje',
    'contact.send':         'Enviar mensaje',
    'contact.sending':      'Enviando…',
    'contact.success':      '¡Mensaje enviado! Hablamos pronto.',
    'contact.close':        'Cerrar',
    'contact.openLabel':    'Abrir formulario de contacto',
    'contact.err.name':          'El nombre es obligatorio.',
    'contact.err.email':         'El correo electrónico es obligatorio.',
    'contact.err.emailInvalid':  'Por favor, introduce un correo válido.',
    'contact.err.message':       'El mensaje es obligatorio.',
    'contact.err.generic':       'Algo salió mal. Por favor, inténtalo de nuevo.',
    // Metrics
    'metrics.heading':      'Impacto en números',
    'metrics.subtitle':     'Resultados concretos detrás del trabajo.',
    'metrics.available':    'Disponible para nuevos proyectos',
    // Resume page
    'resume.back':        '← Volver al Portfolio',
    'resume.download':    'Descargar PDF',
    'resume.summary':     'Resumen',
    'resume.experience':  'Experiencia',
    'resume.education':   'Educación',
    'resume.skills':      'Habilidades',
    'resume.contact':     'Contacto',
    'resume.languages':   'Idiomas',
    'resume.print':       'Imprimir',
    // Footer
    'footer.rights': 'Todos los derechos reservados.',
  },
} as const;

export type Lang = keyof typeof ui;
export type UIKey = keyof typeof ui.en;

export function useTranslations(lang: Lang) {
  return (key: UIKey): string => ui[lang][key];
}
