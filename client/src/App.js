import './App.css';
import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import ShowBooks from './components/ShowBooks/ShowBooks';
import BookDetail from "./components/BookDetail/BookDetail"

function App() {
  return (
    <BrowserRouter>
    <div>
      <Switch>
      <Route path={"/Home"} component={ShowBooks}/>
      <Route path={"/book/:id"} component={BookDetail}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
