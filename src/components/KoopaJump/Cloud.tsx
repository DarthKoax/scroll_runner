import React from 'react';

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
      <img src="/cloud.png" alt="Cloud" style={{ width: '100%', height: 'auto' }} />
    </div>
  );
};

export default Cloud;
