import { useEffect, useState } from "react"
import { useParams,useNavigate } from "react-router-dom"
import { eliminarDog, order } from "../../Redux/actions"
import { useDispatch } from "react-redux"
import axios from "axios"
import './detail.css'
export default function Detail(){
    const {id}=useParams()
    const URL='http://localhost:3001/dogs/'
    const [detail,setDetail]=useState([])
    const [error,setError]=useState('')
    const dispatch=useDispatch()
    const navigate=useNavigate();
    useEffect(()=>{
        axios(URL+id).then(({data})=>{
            setDetail(data)
        }).catch(error=>setError('No hay perros con este ID'))
    },[id])

    function handlerDelete(id){
        dispatch(eliminarDog(id))
        dispatch(order('user'))
        navigate('/home')
    }

    return(
        <div className="contenedor-detail">
        {  error?<h1>{error}</h1>:
            detail.map(e=>{
                return(
                <div className="border-detail" key={e.id}>
                    <div className="background-detail">
                        <figure className="cont-img2">
                            <img className="detail-img" alt={e.name} src={e.imagen?e.imagen:e.image}></img>
                        </figure>
                        
                        <div className="info">
                            <div className="info2">
                                {isNaN(Number(id))?
                                    <div className="eliminar">
                                    <button onClick={()=>handlerDelete(e.id)}>Eliminar raza del usuario</button>
                                </div>:null}
                                <div className="encabezado">
                                    <h1>Raza de perro:</h1>
                                    <h2>{e.name?e.name:e.nombre}</h2>   
                                </div>
                                
                                {e.height[1]?<p>Este perro mide entre: {e.height[0]} y {e.height[1]} cm de alto</p>:
                                <p>Este perro tiene una altura de {e.height[0]}</p>}
                                <p>Este perro pesa entre {e.weight[0]} y {e.weight[1]} kg</p>
                                {e.years[1]?<p>Este perro vive de {e.years[0]} a {e.years[1]} años</p>:
                                <p>Este perro vive en promedio unos {e.years} años</p>}
                                {e.temperament?<p>Este perro tiene los siguientes temperamentos: {e.temperament.join(', ')}</p>:null}
                            </div>
                        </div>
                    </div>
                    
                    
                </div>)  
            })
        }
        </div>
    )
}