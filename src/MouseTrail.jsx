import React, { useState, useEffect, useCallback } from 'react';

const MouseTrail = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });

  const updateMousePosition = useCallback((e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [updateMousePosition]);

  useEffect(() => {
    const smoothMove = () => {
      setTrailPosition(prevPos => ({
        x: prevPos.x + (mousePosition.x - prevPos.x) * 0.2,
        y: prevPos.y + (mousePosition.y - prevPos.y) * 0.2
      }));
      requestAnimationFrame(smoothMove);
    };
    smoothMove();
  }, [mousePosition]);

  return (
    <div
      style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 9999,
        left: `${trailPosition.x - 10}px`,
        top: `${trailPosition.y - 10}px`,
        boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.3)',
      }}
    />
  );
};

export default MouseTrail;