import React, { useState, useEffect, useCallback, useRef } from 'react';
import Player from './Player';
import Obstacle from './Obstacle';
import { useGameLoop } from './useGameLoop';
import {
  GAME_WIDTH,
  GRAVITY,
  JUMP_STRENGTH,
  INITIAL_SPEED,
  SPEED_INCREMENT,
  PLAYER_WIDTH,
  OBSTACLE_WIDTH,
  OBSTACLE_HEIGHT,
} from './constants';
import './styles.css';

interface ObstacleData {
  id: number;
  x: number;
}

const KoopaJump: React.FC = () => {
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAME_OVER'>('START');
  const [displayY, setDisplayY] = useState(0);
  const playerYRef = useRef(0);
  const velocityYRef = useRef(0);
  const [obstacles, setObstacles] = useState<ObstacleData[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem('koopaJumpHighScore') || '0', 10)
  );
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  const nextObstacleId = useRef(0);
  const lastSpawnTime = useRef(0);

  const handleJump = useCallback(() => {
    console.log('handleJump called. GameState:', gameState, 'PlayerY:', playerYRef.current);
    // Allow a small 2px buffer for ground detection to feel more responsive
    if (gameState === 'PLAYING' && playerYRef.current <= 2) {
      console.log('Jump triggered!');
      velocityYRef.current = JUMP_STRENGTH;
    } else if (gameState !== 'PLAYING') {
      console.log('Starting/Restarting game');
      startGame();
    }
  }, [gameState]);

  const startGame = () => {
    setGameState('PLAYING');
    playerYRef.current = 0;
    setDisplayY(0);
    velocityYRef.current = 0;
    setObstacles([]);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    nextObstacleId.current = 0;
    lastSpawnTime.current = performance.now();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        handleJump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleJump]);

  const gameLoop = useCallback((deltaTime: number) => {
    if (gameState !== 'PLAYING') return;

    // Update Speed
    setSpeed((prev) => prev + SPEED_INCREMENT * deltaTime);

    // Update Player
    const dtScale = Math.min(deltaTime / 16.67, 3); // Cap to avoid huge jumps during lag
    
    playerYRef.current -= velocityYRef.current * dtScale;
    
    if (playerYRef.current <= 0) {
      playerYRef.current = 0;
      velocityYRef.current = 0;
    } else {
      // Update velocity for next frame
      let currentGravity = GRAVITY;
      if (Math.abs(velocityYRef.current) < 3) {
        currentGravity = GRAVITY * 0.5; // Hang time at peak
      }
      velocityYRef.current += currentGravity * dtScale;
    }
    
    // Sync to state for rendering
    setDisplayY(playerYRef.current);

    // Update Obstacles
    setObstacles((prev) => {
      const newObstacles = prev
        .map((obs) => ({ ...obs, x: obs.x - speed }))
        .filter((obs) => obs.x > -OBSTACLE_WIDTH);

      // Spawn new obstacle
      const now = performance.now();
      const timeSinceLastSpawn = now - lastSpawnTime.current;
      const minSpawnTime = 1500 - (speed - INITIAL_SPEED) * 100; // Speed up spawning
      
      if (timeSinceLastSpawn > Math.max(800, minSpawnTime) && Math.random() > 0.98) {
        newObstacles.push({ id: nextObstacleId.current++, x: GAME_WIDTH });
        lastSpawnTime.current = now;
      }

      return newObstacles;
    });

    // Update Score
    setScore((prev) => prev + 1);

    // Collision Detection
    const playerLeft = 50;
    const playerRight = 50 + PLAYER_WIDTH;
    const playerBottom = playerYRef.current;

    obstacles.forEach((obs) => {
      const obsLeft = obs.x;
      const obsRight = obs.x + OBSTACLE_WIDTH;
      const obsTop = OBSTACLE_HEIGHT;

      if (
        playerRight > obsLeft + 10 && // Padding for more forgiving collisions
        playerLeft < obsRight - 10 &&
        playerBottom < obsTop - 5
      ) {
        setGameState('GAME_OVER');
      }
    });
  }, [gameState, speed, obstacles]);

  useGameLoop(gameLoop, gameState === 'PLAYING');

  useEffect(() => {
    if (gameState === 'GAME_OVER') {
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('koopaJumpHighScore', score.toString());
      }
    }
  }, [gameState, score, highScore]);

  return (
    <div 
      className={`game-container ${gameState === 'START' ? 'greyscale' : ''}`} 
      onClick={handleJump}
    >
      {gameState !== 'START' && (
        <div className="score-board">
          HI {highScore.toString().padStart(5, '0')} {score.toString().padStart(5, '0')}
        </div>
      )}
      
      <div className="ground" />
      
      <Player 
        y={displayY} 
        isJumping={displayY > 0} 
        isMoving={gameState === 'PLAYING'} 
        isIdle={gameState === 'START'} 
      />
      
      {obstacles.map((obs) => (
        <Obstacle key={obs.id} x={obs.x} />
      ))}

      {gameState === 'GAME_OVER' && (
        <div className="game-over">
          <h1>GAME OVER</h1>
          <button className="restart-btn" onClick={(e) => { e.stopPropagation(); startGame(); }}>RETRY</button>
        </div>
      )}
    </div>
  );
};

export default KoopaJump;
