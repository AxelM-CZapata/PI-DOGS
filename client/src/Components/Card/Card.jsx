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
                    {
    altura[1]?<p>Mide entre {altura[0]}cm de alto a {altura[1]} cm de de alto</p>:
    <p>Mide {altura}cm de alto</p>
                    }
                    <p>Su peso varia entre los {peso[0]} - {peso[1]} kg</p>
                    {
                        years[1]?<p>En promedio vive entre {years[0]} y {years[1]} años</p>:
                        <p>En promedio vive {years} años</p>
                    }
                   {!temperaments?null:temperaments.length===0? null: <p>Esta raza tiene las caracteristicas de ser muy: {temperaments?.join(', ')}</p> }
                    </div>
                </div>
            </div>
    )
}