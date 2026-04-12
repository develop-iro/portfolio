import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

export interface ContactStrings {
  title: string;
  subtitle: string;
  name: string;
  email: string;
  message: string;
  send: string;
  sending: string;
  success: string;
  close: string;
  openLabel: string;
  errName: string;
  errEmail: string;
  errEmailInvalid: string;
  errMessage: string;
  errGeneric: string;
  btn: string;
}

interface Props {
  emailjsServiceId: string;
  emailjsTemplateId: string;
  emailjsPublicKey: string;
  strings: ContactStrings;
}

interface FormState { name: string; email: string; message: string }
interface FormErrors { name?: string; email?: string; message?: string }
type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactModal({ emailjsServiceId, emailjsTemplateId, emailjsPublicKey, strings }: Props) {
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const firstInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  function validate(f: FormState): FormErrors {
    const e: FormErrors = {};
    if (!f.name.trim()) e.name = strings.errName;
    if (!f.email.trim()) e.email = strings.errEmail;
    else if (!EMAIL_REGEX.test(f.email)) e.email = strings.errEmailInvalid;
    if (!f.message.trim()) e.message = strings.errMessage;
    return e;
  }

  // Open from external anchor clicks (#contact)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href="#contact"]');
      if (target) { e.preventDefault(); setOpen(true); }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => firstInputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); return; }
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'input,textarea,button,[tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFields(p => ({ ...p, [name]: value }));
    if (errors[name as keyof FormErrors]) setErrors(p => ({ ...p, [name]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('submitting');
    try {
      await emailjs.send(emailjsServiceId, emailjsTemplateId,
        { from_name: fields.name, from_email: fields.email, message: fields.message },
        emailjsPublicKey
      );
      setStatus('success');
      setFields({ name: '', email: '', message: '' });
    } catch { setStatus('error'); }
  }

  const inputBase = 'w-full px-4 py-2.5 rounded-lg border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm';

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        aria-label={strings.openLabel}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
        {strings.btn}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden="true" />
          <div ref={modalRef} className="relative w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 animate-slide-up">
            <button onClick={() => setOpen(false)} aria-label={strings.close}
              className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <h2 id="contact-modal-title" className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{strings.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{strings.subtitle}</p>

            {status === 'success' ? (
              <div className="py-8 text-center">
                <div className="text-4xl mb-3">✉️</div>
                <p className="text-green-600 dark:text-green-400 font-medium">{strings.success}</p>
                <button onClick={() => { setStatus('idle'); setOpen(false); }}
                  className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline">{strings.close}</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {status === 'error' && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-400">
                    {strings.errGeneric}
                  </div>
                )}
                <div>
                  <label htmlFor="modal-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{strings.name}</label>
                  <input ref={firstInputRef} id="modal-name" name="name" type="text" autoComplete="name" value={fields.name} onChange={handleChange}
                    aria-invalid={!!errors.name} aria-describedby={errors.name ? 'modal-name-err' : undefined}
                    className={`${inputBase} ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`} />
                  {errors.name && <p id="modal-name-err" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="modal-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{strings.email}</label>
                  <input id="modal-email" name="email" type="email" autoComplete="email" value={fields.email} onChange={handleChange}
                    aria-invalid={!!errors.email} aria-describedby={errors.email ? 'modal-email-err' : undefined}
                    className={`${inputBase} ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`} />
                  {errors.email && <p id="modal-email-err" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="modal-message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{strings.message}</label>
                  <textarea id="modal-message" name="message" rows={4} value={fields.message} onChange={handleChange}
                    aria-invalid={!!errors.message} aria-describedby={errors.message ? 'modal-msg-err' : undefined}
                    className={`${inputBase} ${errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} resize-none`} />
                  {errors.message && <p id="modal-msg-err" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.message}</p>}
                </div>
                <button type="submit" disabled={status === 'submitting'}
                  className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-blue-500">
                  {status === 'submitting' ? strings.sending : strings.send}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
