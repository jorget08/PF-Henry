import "./App.css";
import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home/Home";
import BookDetail from "./components/BookDetail/BookDetail";
import FormCreate from "./components/FormCreate/FormCreate";
import Cart from "./components/Cart/Cart";
import LandingPage from "./components/LandingPage/LandingPage";
import Register from "./components/Register/Register";
import Checkout from "./components/Checkout/Checkout";
import UserProfile from "./components/UserProfile/UserProfile";
import Sidebar from "./components/AdminDashboard/Sidebar";
import Stock from "./components/AdminDashboard/Stock";
import SupportAdmin from "./components/AdminDashboard/SupportAdmin";
import { UserFavs } from "./components/User/UserFavs/UserFavs";
import Support from "./components/Support/Support";
import Users from "./components/AdminDashboard/Users";
import EditProfile from "./components/EditProfile/EditProfile";
import Container from "./components/AdminDashboard/Container";
import { AuthContext } from "./auth/authContext";
import { getUser } from "./redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import ShoppingHistory from './components/ShoppingHistory/ShoppingHistory'
import UserConfirmation from "./components/UserConfirmation/UserConfirmation";

function App() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  let id = user.idUser
  //? if token is not null, get user
  useEffect(() => {
    if (token) {
      dispatch(getUser());
    }
  }, [dispatch, token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
      }}
    >
      <>
        <Route exact path={"/"} component={LandingPage} />
        <Route path={"/Home/:search"} component={Home} />
        <Route exact path={"/Home"} component={Home} />
        <Route path={"/book/:id"} component={BookDetail} />
        <Route path={"/createBook"} component={FormCreate} />
        <Route path={"/cart"} component={Cart} />
        <Route path={"/register"} component={Register} />
        <Route path={"/userProfile"} component={UserProfile} />
        <Route path={"/admin"} component={Sidebar} />
        <Route exact path={"/admin"} component={Container} />
        <Route exact path={"/admin/newbook"} component={FormCreate} />
        <Route exact path={"/admin/stock"} component={Stock} />
        <Route exact path={"/admin/users"} component={Users} />
        <Route path={"/checkout"} component={Checkout} />
        <Route path={"/support"} component={Support} />
        <Route path={"/editProfile"} component={EditProfile} />
        <Route exact path={'/favourites'} component={UserFavs}/>
        <Route path={`/ShoppingHistory/${id}`} component={ShoppingHistory} />
        <Route path={`/confirmation/:id`} component={UserConfirmation} />

      </>

    </AuthContext.Provider>
  );
}

export default App;
