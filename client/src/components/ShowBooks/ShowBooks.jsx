import { React, useState } from 'react'
import BookCard from '../BookCard/BookCard'
import Paginated from '../Paginated/Paginated'
import { Link } from 'react-router-dom'
import styles from './styles.css'
import { useSelector } from 'react-redux'

export default function ShowBooks({ books }) {

    var [page, setPage] = useState(1)

    const booksPerPage = 9

    var lastIndex = page * booksPerPage                     //indice incial para metodo slice 
    var firstIndex = lastIndex - booksPerPage               //indice final para metodo slice
    var currentBooks = books.slice(firstIndex, lastIndex)   //metodo slice para determinar del array los libros a mostrar por pagina

    const limitPage = Math.ceil(books.length / booksPerPage)

    var firstPrevControl = false                            //control de botones, deshabilita cuando es imposible la ejecución
    var nextLastControl = false

    if (page === 1) firstPrevControl = true                 //control de botones, dependiendo la posición, deshabilita el correspondiente
    if (page === limitPage) nextLastControl = true

    // pageControl realiza el control del paginado, recibe la información del evento y renderiza mediante el componente Paginated.
    // setea las páginas segun el botón clickeado.

    const paginat = (e, pageNumber) => {
        for (let i = 1; i <= limitPage; i++) {
            let page = document.getElementById(i);
            page.classList.remove("currentPage");
        }
        if (pageNumber === "next" && page + 1 <= limitPage) {
            console.log("page + 1 =", page + 1)
            setPage(page + 1)
            console.log(page)
            let current = document.getElementById(page + 1);
            current.classList.add("currentPage")
        } else if (pageNumber === "prev" && page - 1 >= 1) {
            setPage(page - 1)
            let current = document.getElementById(page - 1);
            current.classList.add("currentPage")
        } else {
            setPage(pageNumber)
            let current = document.getElementById(pageNumber);
            current.classList.add("currentPage")
        }


    }


    return (
        <div className='homeContainer'>
            <div className='catalogue'>
                {
                    currentBooks
                    && currentBooks.map(b => {
                        return (

                            <Link to={`book/${b.id}`} key={b.id}>

                                <BookCard title={b.title} img={b.image} author={b.author} price={b.price} score={b.score} ></BookCard>
                            </Link>
                        )
                    })}
            </div>
            <Paginated paginat={paginat} limitPage={limitPage} firstPrevControl={firstPrevControl} nextLastControl={nextLastControl}></Paginated>
        </div>
    )
}
