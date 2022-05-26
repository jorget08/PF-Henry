import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getBySearch } from "../../redux/actions";
import { FaSistrix } from "react-icons/fa"
import styles from './styles.css'

export default function SearchBar() {

    const dispatch = useDispatch()

    const [search, setSearch] = useState("");

    function handleChange(e) {
        e.preventDefault()
        setSearch(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getBySearch(search));
        setSearch("");
    }
    return (
        <div>
            <div className="searchbar">
                <input type="search" className="search" size={30} placeholder='Search a Book or an Author...' value={search} onChange={(e) => handleChange(e)} />
                <button onClick={(e) => handleSubmit(e)}>
                    <FaSistrix size={25} className="glass" />
                </button>
            </div>
        </div>
    )
}