import { useState, useRef, useEffect } from 'react';
import type { Project } from './data';
import type { Lang } from '../../shared/i18n/translations';

interface Props {
  projects: Project[];
  categories: string[];
  lang: Lang;
  liveDemo: string;
  repository: string;
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>(0);

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2,
        cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -6;
      const rotateY = ((x - cx) / cx) * 6;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
      card.style.transition = 'transform 80ms linear, box-shadow 80ms linear';
      card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
    });
  }

  function onMouseLeave() {
    cancelAnimationFrame(rafRef.current);
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
    card.style.transition = 'transform 400ms ease, box-shadow 400ms ease';
    card.style.boxShadow = '';
  }

  return (
    <article
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white will-change-transform dark:border-gray-700 dark:bg-gray-800"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </article>
  );
}

function CardContent({
  project,
  lang,
  liveDemo,
  repository,
}: {
  project: Project;
  lang: Lang;
  liveDemo: string;
  repository: string;
}) {
  return (
    <>
      <a href={`/projects/${project.slug}`}>
        <img
          src={project.thumbnail}
          alt={project.title}
          loading="lazy"
          className="h-48 w-full bg-gray-100 object-cover dark:bg-gray-700"
        />
      </a>
      <div className="flex flex-1 flex-col p-5">
        <a
          href={`/projects/${project.slug}`}
          className="text-lg font-semibold text-gray-900 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
        >
          {project.title}
        </a>
        <p className="mt-2 flex-1 text-sm text-gray-600 dark:text-gray-300">
          {project.description[lang]}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-4 flex gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              {liveDemo}
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              {repository}
            </a>
          )}
        </div>
      </div>
    </>
  );
}

export default function ProjectFilter({ projects, categories, lang, liveDemo, repository }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const allLabel = lang === 'es' ? 'Todos' : 'All';

  const filtered =
    selectedCategory === allLabel || selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.categories.includes(selectedCategory));

  // Track active dot on scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const index = Math.round(el.scrollLeft / el.offsetWidth);
      setActiveIndex(index);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [filtered]);

  function selectCategory(cat: string) {
    setSelectedCategory(cat);
    setActiveIndex(0);
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
  }

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {[allLabel, ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => selectCategory(cat)}
            className={
              selectedCategory === cat
                ? 'rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white'
                : 'rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Mobile: swipeable carousel — Desktop: grid */}
      <div
        ref={scrollRef}
        className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:hidden"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {filtered.map((project) => (
          <div
            key={project.slug}
            className="flex w-[82vw] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <CardContent
              project={project}
              lang={lang}
              liveDemo={liveDemo}
              repository={repository}
            />
          </div>
        ))}
      </div>

      {/* Dot indicators — mobile only */}
      {filtered.length > 1 && (
        <div className="mt-4 flex justify-center gap-1.5 sm:hidden">
          {filtered.map((_, i) => (
            <button
              key={i}
              aria-label={`Project ${i + 1}`}
              onClick={() => {
                scrollRef.current?.scrollTo({
                  left: i * scrollRef.current.offsetWidth,
                  behavior: 'smooth',
                });
              }}
              className={`rounded-full transition-all duration-300 ${i === activeIndex ? 'h-2 w-5 bg-blue-500' : 'h-2 w-2 bg-gray-300 dark:bg-gray-600'}`}
            />
          ))}
        </div>
      )}

      {/* Desktop grid */}
      <div className="hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <TiltCard key={project.slug}>
            <CardContent
              project={project}
              lang={lang}
              liveDemo={liveDemo}
              repository={repository}
            />
          </TiltCard>
        ))}
      </div>
    </>
  );
}
