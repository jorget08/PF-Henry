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
import Stock from "./components/AdminDashboard/Stock/Stock";
import Sales from "./components/AdminDashboard/Sales/Sales";
import SupportAdmin from "./components/AdminDashboard/SupportAdmin/SupportAdmin";
import { UserFavs } from "./components/User/UserFavs/UserFavs";
import Support from "./components/Support/Support";
import Users from "./components/AdminDashboard/Users/Users";
import Container from "./components/AdminDashboard/Container";
import { AuthContext } from "./auth/authContext";
import { getUser } from "./redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import ShoppingHistory from "./components/ShoppingHistory/ShoppingHistory";
import SupportUser from "./components/SupportUser/SupportUser";
import UserConfirmation from "./components/UserConfirmation/UserConfirmation";
import NewPassword from "./components/NewPassword/NewPassword";
import Reports from './components/AdminDashboard/Reports/Reports'

function App() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  let id = user.idUser;
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
        <Route exact path={"/admin/sales"} component={Sales} />
        <Route exact path={"/admin/reports"} component={Reports} />
        <Route exact path={"/admin/supportAdmin"} component={SupportAdmin} />
        <Route path={"/checkout"} component={Checkout} />
        <Route path={"/support"} component={Support} />
        <Route exact path={"/favourites"} component={UserFavs} />
        <Route path={`/ShoppingHistory/${id}`} component={ShoppingHistory} />
        <Route path={`/SupportUser`} component={SupportUser} />
        <Route path={`/confirmation/:id`} component={UserConfirmation} />
        <Route path={`/password/:id`} component={NewPassword} />
      </>
    </AuthContext.Provider>
  );
}

export default App;
