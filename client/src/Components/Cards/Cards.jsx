import React, { useEffect } from "react";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import Filtraciones from "../Filtraciones/Filtraciones";
import { setCharacter,setTemperamentos,errores } from "../../Redux/actions";
import { Link,useNavigate } from "react-router-dom";
import './cards.css'
import { useSelector,useDispatch } from "react-redux";
export default function Cards(){
    const {paginate,characters,error,copyChar}=useSelector(state=>state)
    const dispatch=useDispatch();
    useEffect(()=>{
        if(!copyChar.length){
        dispatch(setCharacter())
        dispatch(setTemperamentos())}
    },[characters,dispatch,copyChar])
    const navigate=useNavigate()
    let next=paginate*8;
    let prev=next-8;
    const slice= characters.slice(prev,next);    
    
    return(
        <div className="allCards">
            <Filtraciones></Filtraciones>
            {!characters.length && !copyChar.length?<h2>Cargando....</h2>:
            error? (
                <div>
                    <h1>{error}</h1>
                    <button onClick={()=>dispatch(errores(null))}>Volver a home</button>
                </div>
                )
            : !characters.length && copyChar.length?
                <div>
                    <img alt='Chems-not-found' src="https://media.tenor.com/cveog101xMsAAAAi/doge-headphones.gif"></img>
                    <h1>No hay perros creados por el usuario :C, de click para agregar uno! &#8595; &#8595; &#8595;</h1>
                    <button onClick={(event)=>{event.preventDefault(); navigate('/create')}}>¡Agregar perros!</button>
                </div>
            :
            <div className="cont-card">
                {slice.map(e=>
                 <Link key={e.id} to={'/detail/'+e.id}>
                    <Card
                    key={e.id}
                    id={e.id}
                    imagen={e.image}
                    name={e.name}
                    altura={e.height}
                    peso={e.weight}
                    years={e.years}
                    temperaments={e.temperament}/>
                 </Link>
                            )
                }
            </div>
            }
            <Paginado slice={slice} character={characters}></Paginado>
        </div>
    )
}
