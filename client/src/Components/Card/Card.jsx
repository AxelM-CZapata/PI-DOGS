import React from "react";
import './card.css'
export default function Card({id,name,altura,peso,years,imagen,temperaments}){
    return(
            <div className="cardBox">
                <div className="card">
                <img src={imagen} alt="" className="h4"></img>
                    <div className="content">
                        <div className="h3">Raza de perro:</div>
                         <div className="h3"> {name}</div>
                    <p>Su peso varia entre los {peso[0]} - {peso[1]} kg</p>
                   {!temperaments?null:temperaments.length===0? null: <p>Esta raza tiene las caracteristicas de ser muy: {temperaments?.join(', ')}</p> }
                    </div>
                </div>
            </div>
    )
}