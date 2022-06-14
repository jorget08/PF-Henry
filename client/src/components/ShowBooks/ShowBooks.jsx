import { React, useState } from 'react'
import BookCard from '../BookCard/BookCard'
import Paginated from '../Paginated/Paginated'
import './styles.css'
import { useDispatch, useSelector } from 'react-redux'
import Filters from '../Filters/Filters';
import { setPage } from '../../redux/actions'

export default function ShowBooks({ books, categories, func, category, isCategory }) {

    const dispatch = useDispatch()

    var page = useSelector(state => state.page)
    var categories = useSelector(state => state.categories)

    const booksPerPage = 9;

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
        if (pageNumber === "next" && page + 1 <= limitPage) {
            dispatch(setPage(page + 1))
        } else if (pageNumber === "prev" && page - 1 >= 1) {
            dispatch(setPage(page - 1))
        } else {
            dispatch(setPage(pageNumber))
        }
    }

    return (
        <div className='homeContainer'>
            {books.length && categories.length &&
                <div className="filters">

                    <Filters books={books} func={func} categories={categories} isCategory={isCategory} category={category} />
                </div>
            }

            <div className='catalogue'>
                {
                    currentBooks
                    && currentBooks.map(b => {
                        return (

                            <BookCard title={b.title} img={b.image} author={b.author} price={b.price} score={b.score} id={b.id}></BookCard>

                        )
                    })}
            </div>
            <Paginated page={page} paginat={paginat} limitPage={limitPage} firstPrevControl={firstPrevControl} nextLastControl={nextLastControl}></Paginated>
        </div >
    )
}
