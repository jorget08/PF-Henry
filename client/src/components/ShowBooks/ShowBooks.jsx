import { React, useState } from 'react'
import BookCard from '../BookCard/BookCard'
import Paginated from '../Paginated/Paginated'
import { books } from "../DB.js"
import { Link } from 'react-router-dom'
import styles from './styles.css'

export default function ShowBooks() {

    // ----------
    // var books -> proviene del store (useSelector) cargado previamente?
    // importar react redux para los hooks
    // Link de react-router-dom para el linkeado
    // ----------

    var [page, setPage] = useState(1)

    const booksPerPage = 9

    console.log(books)

    var lastIndex = page * booksPerPage                     //indice incial para metodo slice 
    var firstIndex = lastIndex - booksPerPage               //indice final para metodo slice
    var currentBooks = books.slice(firstIndex, lastIndex)   //metodo slice para determinar del array los libros a mostrar por pagina

    console.log(currentBooks)

    const limitPage = Math.ceil(books.length / booksPerPage)

    var firstPrevControl = false                            //control de botones, deshabilita cuando es imposible la ejecución
    var nextLastControl = false

    if (page === 1) firstPrevControl = true                 //control de botones, dependiendo la posición, deshabilita el correspondiente
    if (page === limitPage) nextLastControl = true

    // pageControl realiza el control del paginado, recibe la información del evento y renderiza mediante el componente Paginated.
    // setea las páginas segun el botón clickeado.

    var pageControl = (e) => {
        if (e.target.name === "first") setPage(1)
        if (e.target.name === "previous") setPage(page - 1)
        if (e.target.name === "next") setPage(page + 1)
        if (e.target.name === "last") setPage(limitPage)
    }

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
        <div>
            <div className='catalogue'>
                {
                    currentBooks
                        ? currentBooks.map(b => {
                            return (
                                <Link to={"introducir path segun routing"}>
                                    <BookCard title={b.title} img={b.imgUrl} author={b.author} price={b.price}></BookCard>
                                </Link>
                            )
                        })
                        : <h2>Loading...</h2>}
            </div>
            <Paginated pageControl={pageControl} paginat={paginat} limitPage={limitPage} firstPrevControl={firstPrevControl} nextLastControl={nextLastControl}></Paginated>
        </div>
    )
}
