import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Modal from "../Modal/Modal";
import Login from "../Login/Login";
import { BsCartFill } from "react-icons/bs";
import { IoMdContact } from "react-icons/io";
import { IoHomeSharp } from "react-icons/io5";
import { MdContactSupport } from "react-icons/md";
import { BsFillSunFill } from "react-icons/bs";
import { useModals } from "../Utils/useModals";
import { unlogUser } from "../../redux/actions";
import { GoogleLogout } from "react-google-login";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaShoppingBag } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { ImBooks } from "react-icons/im";
import { FiSun } from "react-icons/fi";
import { BiSupport } from "react-icons/bi"
import Swal from "sweetalert2";
import "./styles.css";

export default function NavBar() {
  const bookCarts = useSelector((state) => state.cart);
  const [isOpenModal, openModal, closeModal] = useModals(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [isLogged, setIsLogged] = useState(false);
  const clientId = `796413127660-tgktohi6gqfm0n183g1kqp6lqehl6ncq.apps.googleusercontent.com`;
  const [sideBar, setSideBar] = useState(true);
  const showSideBar = () => setSideBar(!sideBar);

  function handleLogOut() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Log out",
        text: "Do You Want To Log Out?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Log out",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          setIsLogged(false);
          dispatch(unlogUser());
          reload();
          window.location.href = "/home";
        }
      });
  }
  function reload() {
    window.location.reload(true);
  }
  useEffect(() => {
    token ? setIsLogged(true) : setIsLogged(false);
  }, [token, isLogged]);

  const user = useSelector((state) => state.user);
  let id = user.idUser;



  return (
    <div className="navbar">
      <nav>
        <div
          className="logoBar"
          style={{
            display: "flex",
            justifyContent: isLogged ? "space-between" : "space-evenly",
          }}
        >
          <div className="search">
            <div className="logo">
              <Link to="/">
                <img
                  src="https://www.freeiconspng.com/thumbs/book-icon/book-stack-icon--icon-search-engine-16.png"
                  alt="logo"
                />
                <span>BookStore</span>
              </Link>
            </div>
            <SearchBar />
          </div>
          <div className="links">
            <Link to="/" className="link">
              <IoHomeSharp size={30} />
            </Link>
            <Link to="/home" className="link">
              <ImBooks size={30} />
            </Link>
            <Link to="/support" className="link">
              <MdContactSupport size={32} />
            </Link>
            <Link to="/cart">
              <BsCartFill size={30} className="iconCart" />
              <p>
                {" "}
                {JSON.parse(localStorage.getItem("carrito"))
                  ? JSON.parse(localStorage.getItem("carrito"))?.length
                  : 0}
              </p>
            </Link>
            {isLogged ? (
              user.rols?.name !== "admin" ? (
                <h2
                  style={{
                    marginTop: "18px",
                    color: "rgb(63, 84, 151)",
                    fontWeight: "700px",
                  }}
                >
                  Welcome , {user?.name?.split(' ')[0]}! <BsFillSunFill style={{ color: 'gold', alignItems: 'center' }} />
                </h2>
              ) : (
                <h2
                  style={{
                    marginTop: "18px",
                    color: "rgb(63, 84, 151)",
                    fontWeight: "700px",
                  }}
                >
                  Hi , {user.rols?.name}!
                </h2>
              )
            ) : null}
            {!isLogged && (
              <div className="log">
                <IoMdContact size={33} onClick={openModal} />
                <Modal isOpen={isOpenModal} closeModal={closeModal}>
                  <Login />
                </Modal>
              </div>
            )}
          </div>
          {isLogged && (
            <div className="sideBar">
              <IoMdContact
                onClick={showSideBar}
                style={{ cursor: "pointer" }}
                size={40}
                className="menu"
              />
              <ProSidebar
                collapsed={sideBar}
                width={210}
                collapsedWidth={"0px"}
                onClick={showSideBar}
              >
                <Menu iconShape="square">
                  <MenuItem icon={<CgProfile />}>
                    Your Profile
                    <Link to="/userProfile" />
                  </MenuItem>

                  <MenuItem icon={<BsFillBookmarkHeartFill />}>
                    Liked
                    <Link to="/favourites" />
                  </MenuItem>

                  <MenuItem icon={<FaShoppingBag />}>
                    Shopping History<Link to={`/ShoppingHistory/${id}`}></Link>
                  </MenuItem>

                  {user.rols?.name === "admin" ? (
                    <MenuItem icon={<RiAdminFill />}>
                      Dashboard
                      <Link to="/admin" />
                    </MenuItem>
                  )
                    :
                    <MenuItem icon={<BiSupport />}>
                      User Support<Link to={`/SupportUser`}></Link>
                    </MenuItem>}
                  <MenuItem>
                    <div className="loggedUser">
                      <GoogleLogout
                        clientId={clientId}
                        buttonText="Logout"
                        onLogoutSuccess={handleLogOut}
                      />
                    </div>
                  </MenuItem>
                </Menu>
              </ProSidebar>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
