import { useEffect, useRef } from 'react';
import { particleAnimation } from '../utils/animations';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cleanup = particleAnimation(canvasRef.current);
    return cleanup;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
};

export default ParticleBackground;
