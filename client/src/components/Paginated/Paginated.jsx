import React from 'react'
import styles from './styles.css'

export default function Paginated({limitPag, firstPrevContrl, nextLastContrl, paginat }) {


    // trae las pags, el limite, el controlador de los botones sobre el estado de las paginas
    // y las validaciones de los botones, para que no se puedan oprimir en casos imposibles
    // ej: si estamos en la pagina 1, no poder hacer un firstPage o previousPage

    //se agrega información en un <h3> a modo de guía para indicar el alcance del paginado al usuario.
    var numerPages = [];
    
    for (let i = 1; i <= limitPag; i++) {
        numerPages.push(i);
    }
    return (
        <div className='containerPag'>
            <ul>
                <button disabled={firstPrevContrl} onClick={(e) => paginat(e, 1)} name="first">First page</button>
                <button disabled={firstPrevContrl} onClick={(e) => paginat(e, 'prev')} name="previous">{"<<"}</button>
            </ul>
            <div className='paginate'>
                <ul>
                    {numerPages.map(n => {
                        return <li key={n} className={`li${n}`} id={n}>
                            <h5 onClick={(e) => paginat(e, n)}>

                                {n}
                            </h5>

                        </li>
                    })}
                </ul>
            </div>
            <ul>
                <button disabled={nextLastContrl} onClick={(e) => paginat(e, 'next')} name="next">{">>"}</button>
                <button disabled={nextLastContrl} onClick={(e) => paginat(e, limitPag)} name="last">Last page</button>
            </ul>
        </div>
    )


}