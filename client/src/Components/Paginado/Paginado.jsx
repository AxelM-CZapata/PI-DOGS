import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { paginacion, setPage } from "../../Redux/actions";
import { useEffect,useState } from "react";
import './paginado.css'
export default function Paginado({slice,character}){
    const {paginate}=useSelector(state=>state)
    const dispatch=useDispatch();
    const allPage=Math.ceil(character.length/8)
    const [pages, setPages] = useState([1,2,3,4]);
    useEffect(() => {
        const array = Array.from({ length: allPage }, (_, i) => i+1);
        const chunkSize = 4;
        for (let i = 0; i < array.length; i += chunkSize) {
            const chunk = array.slice(i, i + chunkSize);
            if (chunk.includes(paginate)) {
                return setPages(chunk);
            }
        }
    }, [paginate,allPage]);

    let siguiente;
    if(slice[slice.length-1]!==character[character.length-1]){
        siguiente= <button className="buttonPag" value={paginate} onClick={(event)=>dispatch(paginacion(event,"next"))}>Siguiente</button>
    }
    return(
        <>
        <div className="cont-paginate">
           <button disabled={paginate===1} className="buttonPag" value={paginate} onClick={(event)=>dispatch(paginacion(event,"prev"))}>Atrás</button>
           {
               pages.map((p) =>(   
                   <button
                       key={p}
                       className={paginate === p?'current-Page':'numPage'}
                       onClick={() => {
                           dispatch(setPage(p));
                           window.scrollTo(0,0);
                       }}
                   >
                       {p}
                   </button>
               ))
           }
            {siguiente}              
       </div>
   </>
    )
}

