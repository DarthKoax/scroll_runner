import React, { useState, useEffect } from 'react';
import { GROUND_HEIGHT } from './constants';
import './styles.css';

interface ObstacleProps {
  x: number;
}

const Obstacle: React.FC<ObstacleProps> = ({ x }) => {
  const [plantFrame, setPlantFrame] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlantFrame((prev) => (prev === 1 ? 2 : 1));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="obstacle-container"
      style={{
        left: `${x}px`,
        bottom: `${GROUND_HEIGHT}px`,
      }}
    >
      <div className="piranha-plant">
        <img 
          src={`/plant${plantFrame}.png`} 
          alt="Piranha Plant" 
          className="plant-img" 
        />
      </div>
      <div className="pipe">
        <img src="/pipe.png" alt="Pipe" className="pipe-img" />
      </div>
    </div>
  );
};

export default Obstacle;
