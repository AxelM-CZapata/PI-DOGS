import React from "react";
import {Link} from 'react-router-dom'
import SearchBar from "../SearchBar/SearchBar";
import './nav.css'
import img from './ClipartKey_182273.png'
export default function Nav(){
    return(
        <nav>
                <button className="buttonNav">  <Link to='/' className="link-button">Inicio</Link></button>
                <div className=" cont-img">
                    <img src={img} alt="patas de perros"/>
                   <button className="buttonNav"><Link to='/home' className="link-button">Explorar perros</Link></button> 
                </div>
               <button className="buttonNav"> <Link to='/create' className="link-button">Crear perros</Link></button>
            <SearchBar></SearchBar>
        </nav>
    )
}