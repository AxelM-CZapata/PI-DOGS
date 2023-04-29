import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import axios from 'axios'
import Paginado from "../Paginado/Paginado";
import './cards.css'
import { useSelector } from "react-redux";
export default function Cards(){
    const URL="http://localhost:3001/dogs"
    const [character,setCharacters]=useState([]);
    const {paginate}=useSelector(state=>state)
    useEffect(()=>{
        axios.get(URL)
        .then(({data})=>{ 
            setCharacters([...data])
        })
        .catch(error=>console.log(error))
    },[])
    let next=paginate*8;
    let prev=next-8;
    const slice= character.slice(prev,next);    
    return(
        <div className="allCards">
            <h1>Estoy en cards</h1>
            {!character.length?<h2>Cargando....</h2>:
            <div className="cont-card">
                {slice.map(e=>
                   <Card
                    key={e.id}
                    id={e.id}
                    imagen={e.image}
                    name={e.name}
                    altura={e.height}
                    peso={e.weight}
                    years={e.years}
                    temperaments={e.temperament}/>
                            )
                }
            </div>
            }
            <Paginado slice={slice} character={character}></Paginado>
        </div>
    )
}
