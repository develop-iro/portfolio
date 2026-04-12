import { useState } from 'react';
import emailjs from '@emailjs/browser';

interface ContactFormProps {
  emailjsServiceId: string;
  emailjsTemplateId: string;
  emailjsPublicKey: string;
}

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(fields: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!fields.name.trim()) errors.name = 'Name is required.';
  if (!fields.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_REGEX.test(fields.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!fields.message.trim()) errors.message = 'Message is required.';
  return errors;
}

export default function ContactForm({
  emailjsServiceId,
  emailjsTemplateId,
  emailjsPublicKey,
}: ContactFormProps) {
  const [fields, setFields] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setStatus('submitting');
    try {
      await emailjs.send(
        emailjsServiceId,
        emailjsTemplateId,
        { from_name: fields.name, from_email: fields.email, message: fields.message },
        emailjsPublicKey
      );
      setStatus('success');
      setFields({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  const inputClass =
    'w-full px-4 py-2.5 rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors';
  const errorInputClass = 'border-red-500 dark:border-red-400';
  const normalInputClass = 'border-gray-300 dark:border-gray-600';

  if (status === 'success') {
    return (
      <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-center">
        <p className="text-green-700 dark:text-green-400 font-medium">
          Message sent! I'll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {status === 'error' && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-400">
          Something went wrong. Please try again.
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={fields.name}
          onChange={handleChange}
          aria-describedby={errors.name ? 'name-error' : undefined}
          aria-invalid={!!errors.name}
          className={`${inputClass} ${errors.name ? errorInputClass : normalInputClass}`}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={fields.email}
          onChange={handleChange}
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-invalid={!!errors.email}
          className={`${inputClass} ${errors.email ? errorInputClass : normalInputClass}`}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={fields.message}
          onChange={handleChange}
          aria-describedby={errors.message ? 'message-error' : undefined}
          aria-invalid={!!errors.message}
          className={`${inputClass} ${errors.message ? errorInputClass : normalInputClass} resize-none`}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
