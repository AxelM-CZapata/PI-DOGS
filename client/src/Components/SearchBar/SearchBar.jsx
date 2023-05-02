import React from "react";
import './Search.css'
export default function SearchBar(){
    return(
        <div className="cont-Search">
            <input placeholder="Búsqueda de razas" className="inputSearch"></input>
            <button className="buttonSearch buttonNav">Buscar</button>
        </div>
    )
}
