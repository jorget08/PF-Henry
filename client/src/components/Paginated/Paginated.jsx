import React from 'react'
import styles from './styles.css'
export default function Paginated({ paginat, limitPage, pageControl, firstPrevControl, nextLastControl }) {

    // trae las pags, el limite, el controlador de los botones sobre el estado de las paginas
    // y las validaciones de los botones, para que no se puedan oprimir en casos imposibles
    // ej: si estamos en la pagina 1, no poder hacer un firstPage o previousPage

    //se agrega información en un <h3> a modo de guía para indicar el alcance del paginado al usuario.
    var numerPages = []

    for (let i = 1; i <= limitPage; i++) {
        numerPages.push(i)
    }
    return (
        <div className='containerPag'>
            <ul>
                <button disabled={firstPrevControl} onClick={(e) => paginat(e, 1)} name="first">First Page</button>
                <button disabled={firstPrevControl} onClick={(e) => paginat(e, "prev")} name="previous">{"<<"}</button>

            </ul>
            <div className='paginate'>
                <ul>
                    {numerPages.map(n => {
                        return <li key={n} onClick={(e) => paginat(e, n)} id={n}>
                            <h5>{n}</h5>
                        </li>
                    })}
                </ul>
            </div>
            <ul>
                <button disabled={nextLastControl} onClick={(e) => paginat(e, "next")} name="next">{">>"}</button>
                <button disabled={nextLastControl} onClick={(e) => paginat(e, limitPage)} name="last">Last Page</button>
            </ul>
        </div>
    )

}