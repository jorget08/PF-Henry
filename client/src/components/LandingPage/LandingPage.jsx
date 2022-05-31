import {React, useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";

import NavBar from "../NavBar/NavBar";
import SectionCat from "./SectionCat";


export default function LandingPage() {
    const categories=useSelector(state=>state.categories)
    const dispatch=useDispatch()
    return(
        <>
       <NavBar/>
       <SectionCat/>
        <div></div> 
        </>
    )
}