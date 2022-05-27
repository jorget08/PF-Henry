import './App.css';
import React from "react";
import { Route } from "react-router-dom";
import Home from './components/Home/Home';
import BookDetail from "./components/BookDetail/BookDetail";
import Cart from './components/Cart/Cart';

function App() {
  return (
    <>
      <Route path={"/Home"} component={Home}/>
      <Route path={"/book/:id"} component={BookDetail}/>
      <Route path={"/cart"} component={Cart}/>
    </>
  );
}

export default App;
