import { useState, useEffect, useRef, useCallback } from 'react';

interface Bug {
  id: number;
  x: number; // % from left
  y: number; // % from top
  size: number; // font-size px
  lifetime: number; // ms before escape
}

interface Splat {
  id: number;
  x: number;
  y: number;
}

type GameState = 'idle' | 'playing' | 'gameover';

const MAX_LIVES = 3;
const HEARTS = ['❤️', '❤️', '❤️'];

function Lives({ current }: { current: number }) {
  return (
    <span className="text-sm tracking-widest" aria-label={`${current} lives remaining`}>
      {HEARTS.map((h, i) => (
        <span key={i} style={{ opacity: i < current ? 1 : 0.2 }}>
          {h}
        </span>
      ))}
    </span>
  );
}

export default function BugSquasher() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [splats, setSplats] = useState<Splat[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [highScore, setHighScore] = useState(
    () => parseInt(typeof localStorage !== 'undefined' ? (localStorage.getItem('bugSquasherHS') ?? '0') : '0', 10)
  );

  // Refs so async callbacks always see latest values
  const bugIdRef = useRef(0);
  const splatIdRef = useRef(0);
  const scoreRef = useRef(0);
  const livesRef = useRef(MAX_LIVES);
  const gameStateRef = useRef<GameState>('idle');

  useEffect(() => { scoreRef.current = score; }, [score]);
  useEffect(() => { livesRef.current = lives; }, [lives]);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  // ── spawn a single bug ──────────────────────────────────────────────────────
  const spawnBug = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;

    const id = ++bugIdRef.current;
    const level = Math.floor(scoreRef.current / 5);
    const lifetime = Math.max(1100, 2800 - level * 170);

    const bug: Bug = {
      id,
      x: 4 + Math.random() * 88,
      y: 8 + Math.random() * 76,
      size: 28 + Math.floor(Math.random() * 16),
      lifetime,
    };

    setBugs((prev) => [...prev, bug]);

    // auto-escape after lifetime
    setTimeout(() => {
      setBugs((prev) => {
        if (!prev.find((b) => b.id === id)) return prev; // already squashed
        const newLives = livesRef.current - 1;
        livesRef.current = newLives;
        setLives(newLives);
        if (newLives <= 0) {
          setGameState('gameover');
          gameStateRef.current = 'gameover';
        }
        return prev.filter((b) => b.id !== id);
      });
    }, lifetime);
  }, []);

  // ── spawn interval — restarts each time the level bracket changes ───────────
  const level = Math.floor(score / 5);
  useEffect(() => {
    if (gameState !== 'playing') return;
    const interval = Math.max(580, 1800 - level * 140);
    const timer = setInterval(spawnBug, interval);
    return () => clearInterval(timer);
  }, [gameState, level, spawnBug]);

  // ── start / restart ─────────────────────────────────────────────────────────
  const startGame = useCallback(() => {
    setBugs([]);
    setSplats([]);
    setScore(0);
    setLives(MAX_LIVES);
    scoreRef.current = 0;
    livesRef.current = MAX_LIVES;
    bugIdRef.current = 0;
    splatIdRef.current = 0;
    setGameState('playing');
  }, []);

  // ── squash ──────────────────────────────────────────────────────────────────
  const doSquash = useCallback((bug: Bug) => {
    if (gameStateRef.current !== 'playing') return;

    setBugs((prev) => prev.filter((b) => b.id !== bug.id));

    const sid = ++splatIdRef.current;
    setSplats((prev) => [...prev, { id: sid, x: bug.x, y: bug.y }]);
    setTimeout(() => setSplats((prev) => prev.filter((s) => s.id !== sid)), 650);

    const newScore = scoreRef.current + 1;
    scoreRef.current = newScore;
    setScore(newScore);
    setHighScore((prev) => {
      const next = Math.max(prev, newScore);
      localStorage.setItem('bugSquasherHS', String(next));
      return next;
    });
  }, []);

  const displayLevel = level + 1;
  const isNewRecord = gameState === 'gameover' && score > 0 && score === highScore;

  return (
    <div className="border-t border-gray-200 dark:border-gray-700">
      {/* ── header bar ─────────────────────────────────────────────────────── */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 pb-2 pt-5">
        <div>
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            🐛 Bugs in Production
          </span>
          <span className="ml-2 hidden text-xs text-gray-400 dark:text-gray-500 sm:inline">
            — squash them before code review
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
          <span>
            Best&nbsp;<strong className="text-gray-700 dark:text-gray-200">{highScore}</strong>
          </span>
          {gameState === 'playing' && (
            <>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <span>
                Lv&nbsp;<strong className="text-blue-500">{displayLevel}</strong>
              </span>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <strong className="w-6 text-right text-sm tabular-nums text-blue-400">{score}</strong>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <Lives current={lives} />
            </>
          )}
        </div>
      </div>

      {/* ── game area ──────────────────────────────────────────────────────── */}
      <div className="relative mx-4 mb-5 h-44 select-none overflow-hidden rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-700/60 dark:bg-gray-900/60 md:mx-auto md:h-52 md:max-w-6xl">
        {/* idle */}
        {gameState === 'idle' && (
          <button
            onClick={startGame}
            className="group absolute inset-0 flex flex-col items-center justify-center gap-2 transition-colors hover:bg-blue-600/5"
          >
            <span className="text-5xl group-hover:animate-wiggle">🐛</span>
            <span className="mt-1 text-sm font-semibold text-gray-700 dark:text-gray-200">
              Click to start
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              Tap bugs before they ship to production
            </span>
          </button>
        )}

        {/* game over overlay */}
        {gameState === 'gameover' && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-2 bg-gray-900/80 backdrop-blur-sm">
            <span className="text-4xl">💀</span>
            <p className="text-base font-bold text-white">Bugs shipped to production.</p>
            <p className="text-sm text-gray-400">
              Score&nbsp;<strong className="text-white">{score}</strong>
              {isNewRecord && <span className="ml-2 text-yellow-400">🏆 New record!</span>}
            </p>
            <button
              onClick={startGame}
              className="mt-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
            >
              🚑 Deploy hotfix
            </button>
          </div>
        )}

        {/* bugs */}
        {bugs.map((bug) => (
          <button
            key={bug.id}
            onClick={() => doSquash(bug)}
            onTouchStart={(e) => {
              e.preventDefault();
              doSquash(bug);
            }}
            style={{ left: `${bug.x}%`, top: `${bug.y}%`, fontSize: bug.size, touchAction: 'none' }}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 animate-bug-appear cursor-pointer leading-none transition-transform duration-75 hover:scale-125 active:scale-90"
            aria-label="Squash bug"
          >
            🐛
          </button>
        ))}

        {/* splats */}
        {splats.map((splat) => (
          <span
            key={splat.id}
            style={{ left: `${splat.x}%`, top: `${splat.y}%`, fontSize: 36 }}
            className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2 animate-splat leading-none"
          >
            💥
          </span>
        ))}
      </div>
    </div>
  );
}
