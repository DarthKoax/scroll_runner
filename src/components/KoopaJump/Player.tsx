import React, { useState, useEffect } from 'react';
import { GROUND_HEIGHT } from './constants';
import './styles.css';

interface PlayerProps {
  y: number;
  isJumping: boolean;
  isMoving: boolean;
  isIdle: boolean;
}

const Player: React.FC<PlayerProps> = ({ y, isJumping, isMoving, isIdle }) => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    let interval: number;
    if (isMoving && !isJumping) {
      interval = window.setInterval(() => {
        setFrame((f) => (f === 0 ? 1 : 0));
      }, 150);
    } else {
      setFrame(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMoving, isJumping]);

  let imgSrc = isIdle ? '/stand.png' : (isJumping ? '/jump.png' : (frame === 0 ? '/6.png' : '/7.png'));

  return (
    <div
      className="player"
      style={{
        bottom: `${y + GROUND_HEIGHT}px`,
        left: '50px',
      }}
    >
      <img 
        src={imgSrc} 
        alt="Koopa" 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'contain',
        }}
      />
    </div>
  );
};

export default Player;
