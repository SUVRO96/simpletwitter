import "./App.css";
import Feed from "./components/Feed";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <h1>Simple tweeter</h1>
      <Feed />
    </div>
  );
}

export default App;
