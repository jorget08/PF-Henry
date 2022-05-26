import './App.css';
import React from "react";
import { Route } from "react-router-dom";
import Home from './components/Home/Home';
import BookDetail from "./components/BookDetail/BookDetail"


function App() {
  return (
    <>
      <Route path={"/Home"} component={Home}/>
      <Route path={"/book/:id"} component={BookDetail}/>
    </>
  );
}

export default App;
