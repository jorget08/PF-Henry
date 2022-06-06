import React from 'react'
import styles from './styles.css'
export default function Paginated({ page, paginat, limitPage, pageControl, firstPrevControl, nextLastControl }) {

    var pages = {
        prepre: 0,
        pre: 0,
        page: page,
        next: 0,
        nextnext: 0
    }

    if (page - 2 < 0) { pages.prepre = 0 } else { pages.prepre = page - 2 }
    if (page - 1 < 0) { pages.pre = 0 } else { pages.pre = page - 1 }
    if (page + 1 > limitPage) { pages.next = 0 } else { pages.next = page + 1 }
    if (page + 2 > limitPage) { pages.nextnext = 0 } else { pages.nextnext = page + 2 }

    var numerPages = [pages.prepre, pages.pre, page, pages.next, pages.nextnext]

    return (
        <div className='containerPag'>
            <ul>
                <button disabled={firstPrevControl} className={firstPrevControl ? 'disable' : 'pagButton'} onClick={(e) => paginat(e, 1)} name="first">First Page</button>
                <button disabled={firstPrevControl} className={firstPrevControl ? 'disable' : 'pagButton'} onClick={(e) => paginat(e, "prev")} name="previous">{"<<"}</button>

            </ul>
            <div className='paginate'>
                <ul>
                    {numerPages.map(n => {
                        if (n > 0) {
                            return <li className={(n === page) ? "currentPage" : ""} key={n} onClick={(e) => paginat(e, n)} id={n}>
                                <h5>{n}</h5>
                            </li>
                        }
                    })}
                </ul>
            </div>
            <ul>
                <button disabled={nextLastControl} className={nextLastControl ? 'disable' : 'pagButton'} onClick={(e) => paginat(e, "next")} name="next">{">>"}</button>
                <button disabled={nextLastControl} className={nextLastControl ? 'disable' : 'pagButton'} onClick={(e) => paginat(e, limitPage)} name="last">Last Page</button>
            </ul>
        </div>
    )

}