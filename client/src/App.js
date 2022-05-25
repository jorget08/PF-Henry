import './App.css';
import React from "react";
import { Route } from "react-router-dom";
import ShowBooks from './components/ShowBooks/ShowBooks';

function App() {
  return (
    <>
      <Route path={"/Home"} component={ShowBooks}/>
    </>
  );
}

export default App;
