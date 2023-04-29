import React, { useEffect, useState } from "react";
import './formDogs.css'
import axios from "axios";
import nameValidate from "./Validaciones/nameValidate";
import obtenerDogs from "../../Tools/obtenerDogs";
export default function CrearDogs(){
    const[temp,setTemp]=useState([])
    const [dogs,setDogs]=useState([])
    const[validate,setValidate]=useState('')
    useEffect(()=>{
         axios('http://localhost:3001/temperaments')
        .then(({data})=>setTemp([...data]));
        setDogs(obtenerDogs())
    },[validate])
    // const label=validate
    return(
        <div className="cont-form">
            {<div className="form-container">
                <p>¡Cree su propia raza de perro!</p>
                <form className="form">
                    <label>Nombre de la raza</label>
                    <input  onChange={async(event)=>setValidate(await nameValidate(event,dogs))} className="input" placeholder="Chihuahua"></input>
                    {!Array.isArray(validate)?<label>{validate}</label>:
                    <select size="5">
                        <option disabled selected="">Ya existen estos perros</option>
                    {validate.map(e=> <option value={e} key={e}>{e}</option>)}
                    </select>}
                    
                    <label>Imagen de la raza del perro</label>
                    <input  className="input" placeholder="url"></input>
                    <label>Ingrese la altura minima de la raza</label>
                    <input  className="input" placeholder="15 cm..."></input>
                    <label>Ingrese el peso minimo de la raza</label>
                    <input  className="input" placeholder="5 kg..."></input>
                    <label>Ingrese el peso máximo de la raza</label>
                    <input  className="input" placeholder="15 kg..."></input>
                    <label>Seleccione los temperamentos de esta raza de perro</label>
                    <select name="temperamentos">
                        {temp.map(temp=> <option key={temp} value={temp}>{temp}</option>
                        )}
                    </select>
                    <button>Submit</button>
                </form>
            </div> }
        </div>
    )
}