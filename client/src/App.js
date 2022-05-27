import './App.css';
import React from "react";
import { Route } from "react-router-dom";
import Home from './components/Home/Home';
import BookDetail from "./components/BookDetail/BookDetail"
import FormCreate from './components/FormCreate/FormCreate';


function App() {
  return (
    <>
      <Route path={"/Home"} component={Home}/>
      <Route path={"/book/:id"} component={BookDetail}/>
      <Route path={"/createBook"} component={FormCreate}/>
    </>
  );
}

export default App;
