import React from 'react';
import cloudImg from '../../assets/cloud.png';

interface CloudProps {
  x: number;
  y: number;
  scale: number;
  className?: string;
}

const Cloud: React.FC<CloudProps> = ({ x, y, scale, className }) => {
  return (
    <div
      className={`cloud ${className || ''}`}
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        width: `${80 * scale}px`,
        height: 'auto',
        zIndex: 0,
      }}
    >
      <img src={cloudImg} alt="Cloud" style={{ width: '100%', height: 'auto' }} />
    </div>
  );
};

export default Cloud;
