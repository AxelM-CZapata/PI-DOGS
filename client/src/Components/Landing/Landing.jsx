import { useNavigate } from "react-router-dom"
import './landing.css'
export default function Landing(){
    const navigate=useNavigate()
   return(
   
        <div className="landing-cont">
                <div className="landing">
                <div className="bloques">
                   <h1>¡Bienvenido!</h1>
                   <h3>En esta página podrá ver todo tipo de razas de perro</h3> 
                    <button className="landing-button" onClick={(event)=>{event.preventDefault();navigate('/home')}}>Ir al home</button> 
                </div>
                
             </div>
            
        </div>
    
    
   ) 
}