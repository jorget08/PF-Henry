import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, requestPassword, deleteProfile, changeImg } from '../../redux/actions';
import NavBar from '../NavBar/NavBar';
import Modal from '../Modal/Modal';
import ModalCopy from '../Maps/ModalCopy/ModalCopy';
import Maps from '../Maps/Maps';
import EditProfile from '../EditProfile/EditProfile'
import { useModals } from '../Utils/useModals';
import { FaUserEdit } from 'react-icons/fa'
import { AiOutlineDelete } from 'react-icons/ai'
import { RiMapPinAddLine } from 'react-icons/ri'
import { MdOutlinePassword } from 'react-icons/md'
import Swal from "sweetalert2";
import './style.css'

export default function UserProfile() {
  var user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [isOpenModal, openModal, closeModal] = useModals(false);

  const [isOpenModalCopy, openModalCopy, closeModalCopy] = useModals(false);

  const token = localStorage.getItem("token")


  useEffect(() => {
    dispatch(getUser())
    console.log(user)
  }, [])

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Do you want to delete this address?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then( async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          title: 'This address has been deleted',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
        let adress = await user.adress.filter(adress => adress.idAdress !== id)
        if (adress.length === 0) {
          adress = null
        }
        console.log('soy adress', adress)
        dispatch(deleteProfile(adress, user.idUser))
      }
    })
    
  }

  function handleClick() {
    Swal.fire({
      title: 'Do you want to change your password?',
      showCancelButton: true,
      confirmButtonText: 'Change',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('An email has been sent to you to change your password')
        dispatch(requestPassword(user.email))
      }
    })
  }

  // const formDateishon = new FormData();
  // formDateishon.append("img", selectedImage);

  const handleImage = (e) => {
    const image = e.target.files[0]
    const formData = new FormData()
    formData.append('img', image)

    dispatch(changeImg(user.idUser, 'user', formData))
  }

  return (
    <>
      <NavBar />
      {token?
      <div className='allProfile'>
        <div className='profile'>

          <img src={user.imgProfile} alt="" />
          <form>
            <input type="file" onChange={handleImage} name="file" id="" />
          </form>

          <h1>{user.name} {user.lastName}</h1>
          <h2>{user.email}</h2>
        </div>

        <div className='settingsUser'>


          <button className='buttonSeting' onClick={openModal} title="Edit Profile" >
            <FaUserEdit color="#c03b3b" size={25} />
          </button>



          <button onClick={handleClick} className='buttonSeting' >
            <MdOutlinePassword color="#c03b3b" title="Change Password" size={25} />
            <Modal isOpen={isOpenModal} closeModal={closeModal}>
              <EditProfile />

            </Modal>

          </button>

        </div>


        <div className='adress'>



          {
            <ul className='tableAdress'>
              <li className='tableHeader'>
                <div className='col col-1'><h2>My Addresses</h2> </div>
                <div className='col col-2 direction'> <RiMapPinAddLine onClick={openModalCopy} size={30} color="white" cursor="pointer"/></div>
                <ModalCopy  isOpen={isOpenModalCopy} closeModal={closeModalCopy}>
            <Maps/>
                </ModalCopy>
              </li>

              <ul className='scrollRow'>
                {user.adress ?
                  user.adress.map(e => {
                    return (
                      <li className='table-row'>
                        <div className='col col-1'>
                          <p key={e}>{e.street} {e.number}, {e.city}, {e.state}, {e.country}</p>

                        </div>
                        <div className='col col-2 direction'><AiOutlineDelete cursor="pointer"  color="#c03b3b" size={30} title="Delete Address" onClick={() => handleDelete(e.idAdress)} /> </div>
                      </li>
                    )
                  }) :
                  <li className='table-row'>
                    <div className='col col-1'>
                      <p> You do not have addresses added yet</p>

                    </div>
                  </li>

                }
              </ul>

            </ul>
          }



        </div>
      </div>:
      <div  className="aviso">
      <h2>You need to be logged in to access here</h2>
      <Link to={`/home`}>
      <button className='minimize'>Back home</button>
      </Link>
      </div>}
    </>

  )
}
