import { useState, useEffect, useRef } from 'react';

interface NavLink {
  label: string;
  href: string;
}
interface Props {
  navLinks: NavLink[];
}

export default function HamburgerMenu({ navLinks }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  function open() {
    setIsOpen(true);
  }
  function close() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        close();
        buttonRef.current?.focus();
        return;
      }
      if (e.key === 'Tab' && overlayRef.current) {
        const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0],
          last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    }
    document.addEventListener('keydown', onKeyDown);
    setTimeout(() => overlayRef.current?.querySelector<HTMLElement>('a')?.focus(), 50);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger button — lines animate into X */}
      <button
        ref={buttonRef}
        onClick={isOpen ? close : open}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg p-2 focus-visible:ring-2 focus-visible:ring-blue-500 md:hidden"
      >
        <span className="relative flex h-[18px] w-6 flex-col justify-between">
          <span
            className="block h-0.5 w-full origin-center rounded bg-current transition-all duration-300"
            style={{ transform: isOpen ? 'translateY(8px) rotate(45deg)' : 'none' }}
          />
          <span
            className="block h-0.5 w-full rounded bg-current transition-all duration-300"
            style={{ opacity: isOpen ? 0 : 1, transform: isOpen ? 'scaleX(0)' : 'none' }}
          />
          <span
            className="block h-0.5 w-full origin-center rounded bg-current transition-all duration-300"
            style={{ transform: isOpen ? 'translateY(-8px) rotate(-45deg)' : 'none' }}
          />
        </span>
      </button>

      {/* Full-screen overlay — slides down from top */}
      <div
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!isOpen}
        className="fixed inset-0 z-[52] flex flex-col bg-white dark:bg-gray-950"
        style={{
          transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-100 px-4 dark:border-gray-800">
          <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            iro<span className="text-blue-600 dark:text-blue-400">.dev</span>
          </span>
          <button
            onClick={close}
            aria-label="Close menu"
            tabIndex={isOpen ? 0 : -1}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-1 flex-col items-center justify-center gap-1">
          {navLinks.map(({ label, href }, i) => (
            <a
              key={href}
              href={href}
              onClick={close}
              tabIndex={isOpen ? 0 : -1}
              className="rounded-xl px-8 py-3 text-3xl font-bold text-gray-900 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 0.3s ease ${i * 50 + 150}ms, transform 0.3s ease ${i * 50 + 150}ms, color 0.15s`,
              }}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
