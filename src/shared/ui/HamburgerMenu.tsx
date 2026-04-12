import { useState, useEffect, useRef } from 'react';

interface NavLink { label: string; href: string }
interface Props { navLinks: NavLink[] }

export default function HamburgerMenu({ navLinks }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  function open() { setIsOpen(true); }
  function close() { setIsOpen(false); }

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') { close(); buttonRef.current?.focus(); return; }
      if (e.key === 'Tab' && overlayRef.current) {
        const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
        }
      }
    }
    document.addEventListener('keydown', onKeyDown);
    setTimeout(() => overlayRef.current?.querySelector<HTMLElement>('a')?.focus(), 50);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger button — lines animate into X */}
      <button
        ref={buttonRef}
        onClick={isOpen ? close : open}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        className="md:hidden p-2 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500 min-w-[44px] min-h-[44px] flex items-center justify-center"
      >
        <span className="relative flex flex-col justify-between w-6 h-[18px]">
          <span className="block h-0.5 w-full bg-current rounded transition-all duration-300 origin-center"
            style={{ transform: isOpen ? 'translateY(8px) rotate(45deg)' : 'none' }} />
          <span className="block h-0.5 w-full bg-current rounded transition-all duration-300"
            style={{ opacity: isOpen ? 0 : 1, transform: isOpen ? 'scaleX(0)' : 'none' }} />
          <span className="block h-0.5 w-full bg-current rounded transition-all duration-300 origin-center"
            style={{ transform: isOpen ? 'translateY(-8px) rotate(-45deg)' : 'none' }} />
        </span>
      </button>

      {/* Overlay — always mounted so opacity transition works */}
      <div
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!isOpen}
        className="fixed inset-0 z-40 flex flex-col bg-white dark:bg-gray-900 transition-opacity duration-300 ease-in-out"
        style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        <div className="flex justify-end px-4 py-4">
          <button
            onClick={close}
            aria-label="Close menu"
            tabIndex={isOpen ? 0 : -1}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 flex flex-col items-center justify-center gap-1">
          {navLinks.map(({ label, href }, i) => (
            <a
              key={href}
              href={href}
              onClick={close}
              tabIndex={isOpen ? 0 : -1}
              className="text-3xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 py-3 px-8 rounded-xl transition-colors"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(16px)',
                transition: `opacity 0.35s ease ${i * 60}ms, transform 0.35s ease ${i * 60}ms, color 0.15s`,
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
