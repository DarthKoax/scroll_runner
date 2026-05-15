import React, { useState, useEffect } from 'react';
import { GROUND_HEIGHT } from './constants';
import './styles.css';

import pipeImg from '../../assets/pipe.png';
import plant1Img from '../../assets/plant1.png';
import plant2Img from '../../assets/plant2.png';

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

  const plantImg = plantFrame === 1 ? plant1Img : plant2Img;

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
          src={plantImg} 
          alt="Piranha Plant" 
          className="plant-img" 
        />
      </div>
      <div className="pipe">
        <img src={pipeImg} alt="Pipe" className="pipe-img" />
      </div>
    </div>
  );
};

export default Obstacle;
