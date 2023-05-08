import React, { useEffect, useState } from "react";
import './formDogs.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { order,setCharacter } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import {nameValidate,urlValidate,altValidate,altMaxValidate,Tempers,minPesovalidate,maxPesovalidate,añoMax,añoMin} from "./Validaciones/nameValidate";
import obtenerDogs from "../../Tools/obtenerDogs";
export default function CrearDogs(){
    const[temp,setTemp]=useState([])
    const [dogs,setDogs]=useState([])
    const[validate,setValidate]=useState('')
    const[validateUrl,setUrl]=useState()
    const [validateAltura,setAlt]=useState([])
    const [altMax,setMax]=useState([])
    const [minPeso,setMin]=useState([])
    const [maxPeso,setMaxp]=useState([])
    const [minYear,setMiny]=useState(0)
    const [maxYear,setMaxy]=useState(0)
    const [allTemps,setAll]=useState([])
    const [response,setRes]=useState(null)
    const [badResponse,setBad]=useState(null)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    let check=false;
    let disButton=false
    const urlRegex = /^(?:https?|ftp):\/\/(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[\w-./?%&=]*)?$/;
    let alturas=[]
    let pesos=[]
    let years=[]
            
        if(altMax>validateAltura){
        alturas=[validateAltura.toString(),altMax.toString()]
        }

        if(maxPeso>minPeso){
            pesos=[minPeso.toString(),maxPeso.toString()]
        }

        if(maxYear>minYear){
            years=[minYear.toString(),maxYear.toString()]
        }

    useEffect(()=>{
         axios('http://localhost:3001/temperaments')
        .then(({data})=>setTemp([...data]));
        setDogs(obtenerDogs())
    },[])


    if(validate!=='' && !Array.isArray(validate) && alturas.length>0 && pesos.length>0 && urlRegex.test(validateUrl) && years.length>0 && Array.isArray(allTemps)){
        check=true
        disButton=true;
    }
   
    function deleteTemp(temp,filtros){ 
        const eliminado=filtros.filter(e=>e!==temp && e!==null);
        return eliminado;
    }
    
    async function sendForm(event,validate,validateUrl,alturas,pesos,years,allTemps){
        event.preventDefault();
        const filtros2=allTemps.filter(e=>e!==null);
        if(validate!=='' && alturas.length>0 && pesos.length>0 && Array.isArray(allTemps) ){
            const info={image:validateUrl,name: validate,height:alturas,weight:pesos,years:years,temperament:filtros2}
           axios.post('http://localhost:3001/dogs',info)
            .then((response)=>{setRes(response.data)
                dispatch(setCharacter())
            })
            .catch(error=>setBad('Los datos que se mandaron son incorrectos'))
        }
    }

    function navigation(event){
        event.preventDefault()
        navigate('/home')
        dispatch(order('user'))
    }
    
    return(
        <div className="cont-form">
            {<div className="form-container">
                <p>¡Cree su propia raza de perro!</p>
                <form className="form">
                    <label>Nombre de la raza</label>
                    <input  onChange={async(event)=>setValidate(await nameValidate(event,dogs))} className="input" placeholder="Chihuahua"></input>
                    {!Array.isArray(validate) && validate===''?<label className="error">El nombre de la raza no debe ir vacío</label>:
                    Array.isArray(validate)?(<select defaultValue size="5">
                        <option disabled selected="">Ya existen estos perros</option>
                    {validate?.map(e=> <option className="error" value={e} key={e}>{e}</option>)}
                    </select>):<label>El perro se creara con éxito</label>}

                    <label>Imagen de la raza del perro</label>
                    <input   name='image' onChange={(event)=>setUrl(urlValidate(event))} className="input" placeholder="url"></input>
                    {urlRegex.test(validateUrl)?<label>Se insertara esta imagen del perro</label>: <label className="error">{validateUrl}</label> }
                    
                    <label>Ingrese la altura minima de la raza</label>
                    <input type="number" min={1} onChange={(event)=>setAlt(altValidate(event))}  className="input" placeholder="15 cm..."></input>
                    {typeof validateAltura=== 'string'? <label className="error">{validateAltura}</label>:null}
    
                    <label>Ingrese la altura máxima de la raza</label>
                    {isNaN(validateAltura) || validateAltura<1 || validateAltura.length===0?
                    <input  disabled className="input" placeholder="25 cm..."></input>:
                    <input type="number" min={1} onChange={(event)=>setMax(altMaxValidate(event,validateAltura))} className="input" placeholder="25 cm..."></input>}
                    {!isNaN(altMax) && altMax>validateAltura?<label>El valor es correcto</label>:<label className="error">{altMax}</label>}
                     
                    <label>Ingrese el peso minimo de la raza</label>
                    <input type="number" min={1} onChange={(event)=>setMin(minPesovalidate(event))} className="input" placeholder="5 kg..."></input>
                    {typeof minPeso=== 'string'? <label className="error">{minPeso}</label>:null}

                    <label>Ingrese el peso máximo de la raza</label>
                    {isNaN(minPeso) || minPeso===0 || minPeso.length===0?
                    <input disabled className="input" placeholder="15kg..."></input>:
                    <input type="number" min={1} onChange={(event)=>setMaxp(maxPesovalidate(event,minPeso))} className="input" placeholder="15 kg..."></input>}
                      {!isNaN(maxPeso) && maxPeso>minPeso?<label>El valor es correcto</label>:
                      maxPeso===0?null:
                      <label className="error">{maxPeso}</label>}
                    
                      <label>Ingrese los años de vida minimos de la raza de este perro</label>
                    <input type="number" min={1} onChange={(event)=>setMiny(añoMin(event))} className="input" placeholder="5 años..."></input>
                    <label>{minYear}</label>

                    <label>Ingrese el año máximo de vida de la raza de este perro</label>
                    {isNaN(minYear) || minYear<1?
                    <input  disabled className="input" placeholder="10 años..."></input>:
                    <input type="number" min={1} onChange={(event)=>setMaxy(añoMax(event,minYear))} className="input" placeholder="25 cm..."></input>}
                    {!isNaN(maxYear) && maxYear>minYear?<label>El valor es correcto</label>:<label>{maxYear}</label>}
                    
                    <label>Seleccione los temperamentos de esta raza de perro</label>
                    <select onChange={(event)=>setAll([...allTemps,Tempers(event,allTemps)])}  name="temperamentos">
                        {temp.map(temp=> <option  key={temp} value={temp}>{temp}</option>)}
                    </select>

                    <div className="cont-temps">
                       {allTemps[allTemps.length-1]===null?<label>Este perro ya incluye este temperamento</label>:
                    allTemps?.map(e=>e?<button className="opc-temp" key={e} onClick={()=>setAll(deleteTemp(e,allTemps))}>{e}</button>:null)} 
                    </div>
                    
                    {check? <button onClick={(event)=>sendForm(event,validate,validateUrl,alturas,pesos,years,allTemps)} className="formulario-submit">Submit</button>:
                    <button disabled onClick={()=>disButton=false} className="formulario-submit-disabled">Submit</button>
                    }
                    {!disButton?<label className="error">Complete todos los datos</label>:null}
                    {response && check?<button onClick={navigation} className="button-res-ok">{response}</button>:
                    badResponse?
                    <button className="button-res">{badResponse}</button>:null
                    }
                </form>
            </div> }
        </div>                                                                                  
    )
}