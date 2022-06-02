
import "./App.css";
import React from "react";
import { Route } from "react-router-dom";



import Home from "./components/Home/Home";
import BookDetail from "./components/BookDetail/BookDetail";
import FormCreate from "./components/FormCreate/FormCreate";
import Cart from "./components/Cart/Cart";
import LandingCarousel from "./components/LandingPage/LandingCarousel";
import LandingPage from './components/LandingPage/LandingPage';
import Register from './components/Register/Register';
import UserProfile from "./components/UserProfile/UserProfile";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import Sidebar from "./components/AdminDashboard/Sidebar";
import Stock from "./components/AdminDashboard/Stock";
function App() {
  return (
    <>
      <Route exact path={"/carousel"} component={LandingCarousel} />
      <Route exact path={"/"}component={LandingPage}/>
      <Route path={"/Home"} component={Home} />
      <Route path={"/book/:id"} component={BookDetail} />
      <Route path={"/createBook"} component={FormCreate} />
      <Route path={"/cart"} component={Cart} />
      <Route path={"/register"} component={Register}/>
      <Route path={"/userProfile"} component={UserProfile}/>      
      <Route path={"/admin"} component={Sidebar}/>
      <Route exact path={"/admin/newbook"} component={FormCreate}/>
      <Route exact path={"/admin/stock"} component={Stock}/>
    </>
  );
}

export default App;
