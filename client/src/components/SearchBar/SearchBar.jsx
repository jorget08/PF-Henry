import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getBySearch } from "../../redux/actions";
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
            <div className="searchBar">
                <input type="search" placeholder='Name of a Book or an Author...' value={search} onChange={(e) => handleChange(e)} />
                <input type="button" value="Search" onClick={(e) => handleSubmit(e)} />
            </div>


        </div>
    )
}