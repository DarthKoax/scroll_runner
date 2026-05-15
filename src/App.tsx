import KoopaJump from './components/KoopaJump/KoopaJump'
import './App.css'

function App() {
  return (
    <div className="App">
      <KoopaJump />
      <div className="instructions">
        <p>Press <strong>SPACE</strong> or <strong>UP ARROW</strong> to jump!</p>
        <p>Avoid the Piranha Plants!</p>
      </div>
    </div>
  )
}

export default App
