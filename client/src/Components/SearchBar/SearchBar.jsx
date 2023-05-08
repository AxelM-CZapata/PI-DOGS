import React, {useState } from "react";
import {useSelector,useDispatch} from 'react-redux'
import { busquedas,setPage } from "../../Redux/actions";
import { useNavigate } from "react-router-dom";
import './Search.css'
export default function SearchBar(){
    const dispatch=useDispatch();
    const {copyChar,paginate}=useSelector(state=>state)
    const [searchFilter,setFilter]=useState([])
    const [search,setSearch]=useState('')
    const navigate=useNavigate();
    function handlerSearch(event){
        setSearch(event.target.value)
        setFilter(copyChar.filter(e=>e.name.toLowerCase().includes(search.toLowerCase())))
    }
    function buscar(event){
        if(event.keyCode===13){
            dispatch(busquedas(search))
            setSearch('')
            dispatch(setPage(paginate,1))
            navigate('/home')
        }
        if(!event.keyCode){
            dispatch(busquedas(search))
            dispatch(setPage(paginate,1))
            setSearch('')
            navigate('/home')
        }
        
    }
    return(
        <div className="cont-Search">
<<<<<<< HEAD
            <div className="input-button">
               <input onChange={handlerSearch} onKeyDown={buscar} value={search} placeholder="Búsqueda de razas" className="inputSearch"></input>        
                <button onClick={buscar} className="buttonSearch buttonNav">Buscar</button>  
            </div>
            <div className="select-option">
            {search && searchFilter.length?<select onClick={(event)=>{setSearch(event.target.value)}}>
                {searchFilter.map(e=><option  key={e.name} value={e.name}>{e.name}</option>)}
            </select>:
            null}
            </div>
=======
            <input placeholder="Búsqueda de razas" className="inputSearch"></input>
            <button className="buttonSearch buttonNav">Buscar</button>
>>>>>>> 3d1be272926db15a6e6f961e6e863081419db90c
        </div>
    )
}
