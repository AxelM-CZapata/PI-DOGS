import { useDispatch,useSelector } from "react-redux"
import { useState,useEffect } from "react";
import { order,setPage,orderTemps } from "../../Redux/actions"
import './ordenamientos.css'
export default function Filtraciones(){
    const [selectedValue, setSelectedValue] = useState('');
    const {temperamentos,paginate}=useSelector(state=>state)
    const [temps,setTemps]=useState([])
    const dispatch=useDispatch()
    const handleOrder=({target})=>{
        dispatch(order(target.value))
        dispatch(setPage(paginate,1))
        setSelectedValue('');
    }

    const tempsHandler=({target},tempers)=>{
        const valor=target.value
        dispatch(setPage(paginate,1))
        if(temps.includes(valor))
        return null;
        return valor;
    }

    function deleteTemp(temp,filtros){ 
        const eliminado=filtros.filter(e=>e!==temp && e!==null);
        if(!eliminado.length){
            dispatch(order('all'))
        }
        return eliminado;
    }
    
       
    useEffect(()=>{
        const tempsFiltrados=temps.filter(e=>e!==null)
        if(tempsFiltrados.length){
            dispatch(orderTemps(tempsFiltrados))
        }
    },[temps,dispatch,paginate])
    return(
        <>
        
        
        <div className="cont-filtros">
            <select value={selectedValue} onChange={handleOrder}>
                <option value=''>Ordenar por...</option>
                <option value='A'>De la A a la Z</option>
                <option value='D'>De la Z a la A</option>
                <option value='Pmax'>Del mayor peso al menor peso</option>
                <option value='Pmin'>Del menor peso al mayor peso</option>                
            </select>
            <select value={selectedValue} onChange={handleOrder}>
                <option value=''>Ordenar por origen...</option>
                <option value='all'>Mostrar todos</option>
                <option value='user'>Creados por el usuario</option>
                <option value='API'>Desde la Api</option>
            </select>
            <select onChange={(event)=>setTemps([...temps,tempsHandler(event,temperamentos)])}>
                <option value=''>Ordenar por temperamento</option>
                {temperamentos.map(e=> <option key={e} value={e}>{e}</option>)}
            </select>
        </div>
        <div className="cont-temps">
            {temps[temps.length-1]===null?<label>El temperamento ya ha sido seleccionado</label>:
            temps?.map(e=>e?<button className="opc-temp" key={e} onClick={()=>setTemps(deleteTemp(e,temps))}>{e}</button>:null)} 
        </div>
        </>
    )
}