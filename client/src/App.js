import './App.css';
import React from "react";
import { Route } from "react-router-dom";
import ShowBooks from './components/ShowBooks/ShowBooks';
import Home from './components/Home/Home';

function App() {
  return (
    <>
      <Route path={"/Home"} component={Home}/>
    </>
  );
}

export default App;
