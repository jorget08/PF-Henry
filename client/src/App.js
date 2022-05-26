import './App.css';
import React from "react";
import { Route } from "react-router-dom";
import ShowBooks from './components/ShowBooks/ShowBooks';

import BookDetail from "./components/BookDetail/BookDetail"


function App() {
  return (
    <>
      <Route path={"/Home"} component={ShowBooks}/>
      <Route path={"/book/:id"} component={BookDetail}/>
    </>
  );
}

export default App;
