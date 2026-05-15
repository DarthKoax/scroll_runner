import React, { useState, useEffect } from 'react';
import { GROUND_HEIGHT } from './constants';
import './styles.css';

import standImg from '../../assets/stand.png';
import jumpImg from '../../assets/jump.png';
import frame1Img from '../../assets/6.png';
import frame2Img from '../../assets/7.png';

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

  let imgSrc = isIdle ? standImg : (isJumping ? jumpImg : (frame === 0 ? frame1Img : frame2Img));

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
