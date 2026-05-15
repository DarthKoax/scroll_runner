# Koopa Jump (404 Interactive Game)

An interactive, retro-styled jumping game featuring Koopa Troopa. This project is designed to be easily integrated as a fun 404 error page or a standalone mini-game.

## 🎮 How to Play

- **Start**: Press **Space**, **Arrow Up**, or **Click/Tap** the screen.
- **Jump**: Press **Space** or **Arrow Up** to jump over obstacles.
- **Goal**: Avoid the Piranha Plants and survive as long as possible to get a high score!

## ✨ Features

- **Dynamic Difficulty**: The game speed gradually increases as you play, capping at a challenging but fair maximum speed.
- **Animated Sprites**: Hand-crafted animations for Koopa (walking, jumping, idling) and the Piranha Plants.
- **Interactive Transitions**: Starts in a stylish greyscale "idle" mode and fades into full color once the game begins.
- **Customizable Messaging**: Supports a `message` prop to display custom text (like "404 Not Found") on the start screen.
- **Parallax-style Background**: Floating clouds that move independently of the ground obstacles.
- **Persistent High Scores**: Saves your best score locally using Browser Storage.

## 🛠️ Tech Stack

- **Framework**: React 19 (TypeScript)
- **Build Tool**: Vite 8
- **Styling**: Vanilla CSS (Surgical precision, no heavy frameworks)
- **Asset Pipeline**: ESM imports for optimized bundling and cache-busting.

## 🚀 Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd koopasaur
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production

To create an optimized production build:
```bash
npm run build
```
The output will be in the `dist/` folder.

## 📁 Project Structure

- `src/components/KoopaJump/`: Core game logic and components.
  - `KoopaJump.tsx`: Main game state and orchestration.
  - `Player.tsx`: Koopa character logic and animations.
  - `Obstacle.tsx`: Pipe and Piranha Plant logic.
  - `Cloud.tsx`: Background cloud component.
  - `useGameLoop.ts`: Custom hook for the high-performance requestAnimationFrame loop.
- `src/assets/`: Optimized game sprites and artwork.

## 🔧 Customization

You can pass a custom message to the game via the `message` prop in `App.tsx`:

```tsx
<KoopaJump message="Page Not Found" />
```

Enjoy the jump! 🐢💨
