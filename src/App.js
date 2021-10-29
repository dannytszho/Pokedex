import { BrowserRouter, Switch, Route } from "react-router-dom";
import Pokedex from "./Pokedex";
import Pokemon from "./Pokemon";
import "./index.css";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Switch>
          <Route path="/:id">
            <Pokemon />
          </Route>
          <Route path="/">
            <Pokedex />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
