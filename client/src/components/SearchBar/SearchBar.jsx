import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, getBySearch, setPage } from "../../redux/actions";
import { FaSistrix } from "react-icons/fa"
import styles from './styles.css'
import { useHistory } from "react-router-dom";

export default function SearchBar({ categories }) {

    const dispatch = useDispatch()
    
    var page = useSelector(state => state.page)

    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [boolean, setBoolean] = useState(true);

    let history = useHistory()

    const table = useSelector(state => state.allBookBackup)
    const titles = table.map(e => ({ tit: e.title, aut: e.author, img: e.image, id: e.id }))

    function handleChange(e) {
        e.preventDefault()
        setSearch(e.target.value)
        if (e.target.value !== "") {
            var matches = titles.filter(r => {
                if (r.tit.toLowerCase().includes(e.target.value.toLowerCase())
                    || r.aut.toLowerCase().includes(e.target.value.toLowerCase())

                ) {
                    return r
                }
            })
            setResults([...matches])
            if (matches.length === 0) { setResults([{ tit: "No matches", aut: "try again...", img: "https://e7.pngegg.com/pngimages/598/31/png-clipart-orange-x-sign-computer-icons-x-mark-red-x-mark-miscellaneous-angle.png" }]) }
            setBoolean(!boolean)
        } else {
            setResults([])
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getBySearch(search));
        dispatch(setPage(1));
        setSearch("");
        setResults([])
        history.push(`/Home/`)
    }

    function handleSearch(id) {
        if (id) {
            history.push(`/book/${id}`)
        }
    }

    return (
        <>
            <div>
                <form className="searchbar">
                    <input type="search" className="search" size={30} placeholder='Search a Book or an Author...' value={search} onChange={(e) => handleChange(e)} />
                    <button onClick={(e) => handleSubmit(e)}>
                        <FaSistrix size={25} className="glass" />
                    </button>
                </form>
                <ul className="containerSearch">
                    {results.length > 0 ?
                        results.map((r, i) => {
                            return (
                                <div className='itemS' id={i === 0 ? 'first' : ''} >
                                    <li className="info" value={r.tit}
                                        height="300px"
                                        width="300px"
                                        onClick={(e) => {
                                            handleSearch(r.id)
                                        }}>{`${(r.tit.length>50)? (r.tit.toUpperCase().slice(0,50) + "...") : r.tit.toUpperCase()}: ${r.aut}`}
                                    </li>
                                    <img src={r.img}></img>
                                </div>
                            )
                        })
                        : null}
                </ul>
            </div>

        </>
    )
}