import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl, { Map, Marker } from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './styles.css'
import { Formik, Form, Field } from 'formik';
import { addAdress } from '../../redux/actions';
import Swal from "sweetalert2";
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
    
    let markerPoint = null
    

    function addAddressToUser(){
        dispatch(addAdress(address, user.idUser))
         Swal.fire(
                        'Done!',
                        'An adress have been added to your profile',
                        'success'
                    )
    }

    // async function handleOnClick() {
    //     const objeto = await axios.get(`https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=35c9CgwMnpuFXkfGgfHNlMyBpMfW685i9LOKRMaVRz0&searchtext=${address.street}+${address.number}+${address.city}+${address.country}`)
    //         .then(res => {
    //             return {
    //                 lati: res.data.Response.View[0].Result[0].Location.DisplayPosition.Latitude,
    //                 login: res.data.Response.View[0].Result[0].Location.DisplayPosition.Longitude
    //                 // console.log('soyresponse',res.Response.View[0].Result[0].Location.DisplayPosition)
    //                 // setlogitud(res.Response.View[0].Result[0].Location.DisplayPosition.Longitude)
    //                 // setLat(res.Response.View[0].Result[0].Location.DisplayPosition.Latitude)
    //             }
    //         })
    //         .catch(error => console.log(error))
    //     console.log('soy el objetin', objeto)
    //     // const marker = new Marker()
       
            
    //     mapa?.flyTo({
    //         center: [objeto.login, objeto.lati],
    //         zoom: 14

    //     })
    //     if(markerPoint!==null) markerPoint.remove()
    //     markerPoint=new mapboxgl.Marker()
    //    .setLngLat([objeto.login, objeto.lati])
    //    .addTo(mapa);


    // }
    
    useEffect(async ()=>{
        if(Object.keys(address).length!==0){
            console.log('soy adress',address)
            const objeto = await axios.get(`https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=35c9CgwMnpuFXkfGgfHNlMyBpMfW685i9LOKRMaVRz0&searchtext=${address.street}+${address.number}+${address.city}+${address.country}`)
            .then(res => {
                return {
                    lati: res.data.Response.View[0].Result[0].Location.DisplayPosition.Latitude,
                    login: res.data.Response.View[0].Result[0].Location.DisplayPosition.Longitude

                }
            })
            .catch(error => console.log(error))
        console.log('soy el objetin', objeto)
        // const marker = new Marker()
       
            
        mapa?.flyTo({
            center: [objeto.login, objeto.lati],
            zoom: 14

        })
        if(markerPoint!==null) markerPoint.remove()
        markerPoint=new mapboxgl.Marker()
       .setLngLat([objeto.login, objeto.lati])
       .addTo(mapa);

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
                   
                    resetForm()
                }}>
                {({ touched, errors }) => (
                    <Form classname="LoginFormm">
                        <h2 id="title">Add an adress!!</h2>
                        <div className='fieldLog'>
                            <label>Country: </label>
                            <Field type="text" name="country" placeholder="Country" />
                            {touched.country && errors.country && <span>{errors.country}</span>}
                        </div>
                        <div className='fieldLog'>
                            <label>State: </label>
                            <Field type="text" name="state" placeholder="State" />
                            {touched.state && errors.state && <span>{errors.state}</span>}
                        </div>
                        <div className='fieldLog'>
                            <label>City: </label>
                            <Field type="text" name="city" placeholder="City" />
                            {touched.city && errors.city && <span>{errors.city}</span>}
                        </div>
                        <div className='fieldLog'>
                            <label>Street: </label>
                            <Field type="text" name="street" placeholder="Street" />
                            {touched.street && errors.street && <span>{errors.street}</span>}
                        </div>
                        <div className='fieldLog'>
                            <label>Number: </label>
                            <Field type="number" name="number" placeholder="Number" />
                            {touched.number && errors.number && <span>{errors.number}</span>}
                        </div>
                        <div >
                            <button type="submit" >Search address</button>
                        </div>
                    </Form>
                )}
            </Formik>
            <button onClick={addAddressToUser}>Add an address</button>
            </div>
            <div ref={mapContainer} className="map-container" />

          
           
        </div>
    );
}