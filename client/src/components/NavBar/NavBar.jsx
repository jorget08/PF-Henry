import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import Modal from '../Modal/Modal';
import Login from '../Login/Login';
import { BsCart2 } from 'react-icons/bs';
import { IoMdContact } from 'react-icons/io';
import { IoHomeOutline } from 'react-icons/io5';
import { MdContactSupport } from 'react-icons/md';
import { AiOutlineMenu } from 'react-icons/ai'
import { useModals } from '../Utils/useModals';
import { unlogUser } from '../../redux/actions';
import { GoogleLogout } from 'react-google-login';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { BsFillBookmarkHeartFill } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { FaShoppingBag } from 'react-icons/fa'
import { RiAdminFill } from "react-icons/ri"
import { ImBooks } from 'react-icons/im'
import Swal from "sweetalert2";
import "./styles.css"



export default function NavBar() {
    const bookCarts = useSelector(state => state.cart);
    const [isOpenModal, openModal, closeModal] = useModals(false);
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const [isLogged, setIsLogged] = useState(false);
    const clientId = `796413127660-tgktohi6gqfm0n183g1kqp6lqehl6ncq.apps.googleusercontent.com`
    const [sideBar, setSideBar] = useState(true);
    const showSideBar = () => setSideBar(!sideBar);


    function handleLogOut() {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: true
        })

        swalWithBootstrapButtons.fire({
            title: 'Log out',
            text: "Do You Want To Log Out?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Log out',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                setIsLogged(false)
                dispatch(unlogUser())
                reload()
            }
        })
    }
    function reload() {
        window.location.reload(true);
    }
    useEffect(() => {
        token ? setIsLogged(true) : setIsLogged(false);
    }, [token, isLogged])

    const user = useSelector(state => state.user)
    let id = user.idUser


    return (
        <div className="navbar">
            <nav>
                <div className='logoBar' style={{ display: "flex", justifyContent: isLogged ? "space-between" : "space-evenly" }}>
                    <div className='search'>
                        <div className='logo'>
                            <Link to='/'>
                                <img src="https://www.freeiconspng.com/thumbs/book-icon/book-stack-icon--icon-search-engine-16.png" alt="logo" />
                                <span>BookStore</span>
                            </Link>

                        </div>
                        <SearchBar />

                    </div>
                    <div className='links'>
                        <Link to='/' className='link'>
                            <IoHomeOutline size={30} />
                        </Link>
                        <Link to='/home' className='link'>
                            <ImBooks size={30} />
                        </Link>
                        <Link to='/support' className='link'>
                            <MdContactSupport size={32} />
                        </Link>
                        <Link to='/cart'>
                            <BsCart2 size={30} className="iconCart" />
                            <p> {JSON.parse(localStorage.getItem("carrito")) ? JSON.parse(localStorage.getItem("carrito"))?.length : 0}</p>
                        </Link>
                        {!isLogged &&
                            <div className='log'>
                                <IoMdContact size={33} onClick={openModal} />
                                <Modal isOpen={isOpenModal} closeModal={closeModal}>
                                    <Login />

                                </Modal>
                            </div>}
                    </div>
                    {isLogged &&
                        <div className='sideBar'>
                            {console.log(user.imgProfile)}
                            {user?.imgProfile ?
                                <img onClick={showSideBar} style={{ cursor: 'pointer', width: '3rem', borderRadius: '50%', padding: '10px 20px' }} src={user?.imgProfile} alt="" />
                                :
                                <IoMdContact onClick={showSideBar} style={{ cursor: 'pointer' }} size={40} className="menu" />
                            }
                            <ProSidebar collapsed={sideBar} width={210} collapsedWidth={"0px"} onClick={showSideBar} >
                                <Menu iconShape="square">
                                    <MenuItem icon={<CgProfile />}>Your Profile<Link to="/userProfile" /></MenuItem>

                                    <MenuItem icon={<BsFillBookmarkHeartFill />}>Liked<Link to="/favourites" /></MenuItem>


                                    <MenuItem icon={<FaShoppingBag />}>Shopping History<Link to={`/ShoppingHistory/${id}`}></Link></MenuItem>
                                    {user.rols?.name === "admin" &&
                                        <MenuItem icon={<RiAdminFill />}>Dashboard<Link to="/admin" /></MenuItem>
                                    }
                                    <MenuItem>
                                        <div className="loggedUser">
                                            <GoogleLogout
                                                clientId={clientId}
                                                buttonText="Logout"
                                                onLogoutSuccess={handleLogOut}
                                            />

                                        </div></MenuItem>


                                </Menu>
                            </ProSidebar>
                        </div>
                    }

                </div>

            </nav >
        </div >
    )
}
