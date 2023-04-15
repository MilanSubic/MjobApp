import React from "react";
import {Route, Switch, BrowserRouter} from "react-router-dom";
import UpravljanjeNalozima from "./pages/Admin/UpravljanjeNalozima";
import './App.css';
import ApplicationHeader from "./components/ApplicationHeader";

function App() {
  return (
      <BrowserRouter>


      <ApplicationHeader/>
    <Switch>
          <Route exact path="/upravljanjeNalozima">
              <UpravljanjeNalozima/>
          </Route>
      </Switch>
      </BrowserRouter>
  );
}

export default App;
