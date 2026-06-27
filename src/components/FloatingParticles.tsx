import { useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  type: 'star' | 'circle';
}

export function FloatingParticles({ count = 10 }: { count?: number }) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 4 + Math.random() * 8,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 12,
      type: Math.random() > 0.5 ? 'star' : 'circle' as 'star' | 'circle',
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            animation: `particle-float-${(p.id % 2) + 1} ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.type === 'star' ? (
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 12 12"
              fill="none"
              className="opacity-40"
            >
              <path
                d="M6 0L7.2 4.8L12 6L7.2 7.2L6 12L4.8 7.2L0 6L4.8 4.8L6 0Z"
                fill="#B8C4CE"
              />
            </svg>
          ) : (
            <div
              className="rounded-full bg-ivory-text-accent opacity-30"
              style={{ width: p.size, height: p.size }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
