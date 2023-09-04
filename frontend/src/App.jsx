import { Home, Customize } from "./pages";
import Canvas from "./canvas/CanvasModel";
import "./App.css";

function App() {
  return (
    <div className="app transition-all ease-in">
      <Home />
      <Canvas />
      <Customize />
    </div>
  );
}

export default App;
