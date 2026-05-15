import React from 'react';

interface CloudProps {
  x: number;
  y: number;
  scale: number;
}

const Cloud: React.FC<CloudProps> = ({ x, y, scale }) => {
  return (
    <div
      className="cloud"
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        width: `${60 * scale}px`,
        height: `${30 * scale}px`,
        backgroundColor: 'white',
        borderRadius: '20px',
        opacity: 0.8,
        zIndex: 0,
      }}
    />
  );
};

export default Cloud;
