import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
<<<<<<< HEAD
import Home from './components/Home/Home';
import BookDetail from "./components/BookDetail/BookDetail"
import FormCreate from './components/FormCreate/FormCreate';
import Cart from './components/Cart/Cart';
import LandingPage from './components/LandingPage/LandingPage';


=======
import Home from "./components/Home/Home";
import BookDetail from "./components/BookDetail/BookDetail";
import FormCreate from "./components/FormCreate/FormCreate";
import Cart from "./components/Cart/Cart";
import LandingCarousel from "./components/LandingPage/LandingCarousel";
>>>>>>> 14d582b49ecbd555841d597f9148421d3fbda2f9
function App() {
  
  return (
    <>
<<<<<<< HEAD
      <Route exact path={'/'}component={LandingPage}/>
      <Route path={"/Home"} component={Home}/>
      <Route path={"/book/:id"} component={BookDetail}/>
      <Route path={"/createBook"} component={FormCreate}/>
      <Route path={"/cart"} component={Cart}/>
=======
      <Route exact path={"/"} component={LandingCarousel} />
      <Route path={"/Home"} component={Home} />
      <Route path={"/book/:id"} component={BookDetail} />
      <Route path={"/createBook"} component={FormCreate} />
      <Route path={"/cart"} component={Cart} />
>>>>>>> 14d582b49ecbd555841d597f9148421d3fbda2f9
    </>
  );
}

export default App;
