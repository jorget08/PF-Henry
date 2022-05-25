import React from 'react'

export default function Paginated({pag, limitPag, pageContrl,firstPrevContrl, nextLastContrl}) {

// trae las pags, el limite, el controlador de los botones sobre el estado de las paginas
// y las validaciones de los botones, para que no se puedan oprimir en casos imposibles
// ej: si estamos en la pagina 1, no poder hacer un firstPage o previousPage

//se agrega información en un <h3> a modo de guía para indicar el alcance del paginado al usuario.

return (
    <>
        <ul>
            <button disabled={firstPrevContrl} onClick={(e) => pageContrl(e)} name="first">Primera página</button>
            <button disabled={firstPrevContrl} onClick={(e) => pageContrl(e)} name="previous">Página anterior</button>
            <button disabled={nextLastContrl} onClick={(e) => pageContrl(e)} name="next">Página siguiente</button>
            <button disabled={nextLastContrl} onClick={(e) => pageContrl(e)} name="last">Última página</button>
        </ul>
        <h3>Página {pag} de {limitPag}</h3>
    </>
)

}