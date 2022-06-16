import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

import mapboxgl, { Map, Marker } from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import { Formik, Form, Field } from 'formik';
import { addAdress } from '../../redux/actions';

import 'mapbox-gl/dist/mapbox-gl.css';
import './styles.css'
import Swal from "sweetalert2";
// import {TbMapSearch} from 'react-icons/tb'
// import {RiMapPinAddLine} from 'react-icons/ri'

import axios from 'axios'

mapboxgl.accessToken = 'pk.eyJ1IjoiY2FtaWxhMDAzIiwiYSI6ImNsNGRzNWJtMjA5dzkzcG16c2czMzJpcTMifQ.x1SfyY9BpY3_n-oPk83CSg';

export default function Maps() {
    const dispatch = useDispatch()
    const [logitud, setlogitud] = useState(-64.248373);
    const [lat, setLat] = useState(-35.562300);
    const [zoom, setZoom] = useState(3);
    var user = useSelector(state => state.user)
    const [address, setAddress] = useState({})

 

    const mapContainer = useRef(null);

    const [mapa, setMapa] = useState()
    const [markerPoint, setMarkerPoint]=useState()
    

    

    function addAddressToUser(){
        dispatch(addAdress(address, user.idUser))
         Swal.fire({
                        title:'Done!',
                        text:'An adress have been added to your profile',
                        icon:'success',
                        showConfirmButton:false,
                    })
                    setMapa(
                        new Map({
                            container: mapContainer.current,
                            style: 'mapbox://styles/mapbox/streets-v11',
                            center: [logitud, lat],
                            zoom: zoom
                        })
                    )
                  
    }


    
    useEffect(async ()=>{
        if(Object.keys(address).length!==0){
            console.log('soy adress',address)
            const objeto = await axios.get(`https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=35c9CgwMnpuFXkfGgfHNlMyBpMfW685i9LOKRMaVRz0&searchtext=${address.street}+${address.number}+${address.city}+${address.state}+${address.country}`)
            .then(res => {
                if(res.data.Response.View.length !==0){
                return {
                    lati: res.data.Response.View[0].Result[0].Location.DisplayPosition.Latitude,
                    login: res.data.Response.View[0].Result[0].Location.DisplayPosition.Longitude

                }}
                else{
                    return null
                }
            })
            .catch(error => console.log(error))
        console.log('soy el objetin', objeto)
        // const marker = new Marker()
       
            if(objeto!==null){
        mapa?.flyTo({
            center: [objeto.login, objeto.lati],
            zoom: 14

        })
        markerPoint?.remove()

        setMarkerPoint( new Marker()
       .setLngLat([objeto.login, objeto.lati])
       .addTo(mapa));

        }else{
            Swal.fire({
                title: 'This address does not exist or not found!!',
                text:"Do you want to add it anyway?",
                showCancelButton: true,
                timer: 1500,
                confirmButtonText: 'Yes, I want to add it',
              }).then( async(result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    addAddressToUser()
                  
                }
              })
        }
    
    
    }
    },[address])
    useEffect(() => {
        if (mapContainer.current) {// initialize map only once
            setMapa(
                new Map({
                    container: mapContainer.current,
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: [logitud, lat],
                    zoom: zoom
                })
            )
           
        };
        
    }, [mapContainer]);

    return (
        <div className="globalDiv">
            <div>
            <Formik
                initialValues={{
                    country: "",
                    state: "",
                    city: "",
                    street: "",
                    number: ""
                }}
                validate={(valores) => {
                    let errors = {};
                    if (!valores.country) {
                        errors.country = "Country required"
                    }
                    if (!valores.state) {
                        errors.state = "State required"
                    }
                    if (!valores.city) {
                        errors.city = "City required"
                    }
                    if (!valores.street) {
                        errors.street = "Street required"
                    }
                    if (!valores.number) {
                        errors.number = "Number required"
                    }
                    return errors;
                }}
                onSubmit={(valores, { resetForm }) => {
                    //? si adress null, crear una nueva [adress]
                    //* [adress, ...adress]
                    //? adress [{}] filtrar

                    const adress = {
                        idAdress: valores.number + valores.street,
                        country: valores.country,
                        state: valores.state,
                        city: valores.city,
                        street: valores.street,
                        number: valores.number
                    }
                    setAddress(adress)

                    
                    // dispatch(addAdress(adress, user.idUser))
                   
                    
                }}>
                {({ touched, errors }) => (
                    <Form classname="LoginFormm">
                        <h2 id="title">Add an adress!!</h2>
                        <div className='fieldLogg'>
                            <label>Country: </label>
                            <Field type="text" name="country" placeholder="Country" />
                            {touched.country && errors.country && <span className="errorsMap">{errors.country}</span>}
                        </div>
                        <div className='fieldLogg'>
                            <label>State: </label>
                            <Field type="text" name="state" placeholder="State" />
                            {touched.state && errors.state && <span className="errorsMap">{errors.state}</span>}
                        </div>
                        <div className='fieldLogg'>
                            <label>City: </label>
                            <Field type="text" name="city" placeholder="City" />
                            {touched.city && errors.city && <span className="errorsMap">{errors.city}</span>}
                        </div>
                        <div className='fieldLogg'>
                            <label>Street: </label>
                            <Field type="text" name="street" placeholder="Street" />
                            {touched.street && errors.street && <span className="errorsMap">{errors.street}</span>}
                        </div>
                        <div className='fieldLogg'>
                            <label>Number: </label>
                            <Field type="number" name="number" placeholder="Number" />
                            {touched.number && errors.number && <span className="errorsMap">{errors.number}</span>}
                        </div>
                        <div >
                            <button type="submit" >Search address   </button>
                        </div>
                    </Form>
                )}
            </Formik>

            <button onClick={addAddressToUser}>Add address </button>

            </div>
            <div ref={mapContainer} className="map-container" id="mapita"/>

          
           
        </div>
    );
}