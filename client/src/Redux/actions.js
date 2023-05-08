import axios from 'axios' 
export function paginacion({target},accion){
    let prev=Number(target.value);
    switch(accion){
        case "prev": 
                    if(prev>1){
                        return{
                            type: 'pagina',
                            payload: prev-1
                        }
                    }
                    return{
                        type: 'pagina',
                        payload: 1
                    }
        case "next":
                    return{
                        type: 'pagina',
                        payload: prev+1
                    }
        default: console.log('No existe este metodo')
        }
}

export function setPage(p,page) {
    if(page){
    p=page;}
    return {
        type: "SET_PAGE",
        payload: p
    };
}

export  function busquedas(name){
    const URL="http://localhost:3001/dogs?name="+name;

    return(dispatch)=>{
        axios.get(URL).then(({data})=>{
            return dispatch({
            type: 'SET_SEARCH',
            payload: data
        }) 
        }).catch(error=>{
            return dispatch({
                type: 'ERROR',
                payload: 'Este perro no existe'
            })
        })
    } 
}
export function errores(message){
    return{
        type: "ERROR",
        payload:message
    }
}

export function setCharacter(){
    const URL="http://localhost:3001/dogs";

        return(dispatch)=>{
            axios.get(URL).then(({data})=>{
                return dispatch({
                type: 'SET_CHARACTER',
                payload: data
            }) 
            })
        }     
}

export function setTemperamentos(){
    const URL="http://localhost:3001/temperaments";

        return(dispatch)=>{
            axios.get(URL).then(({data})=>{
                return dispatch({
                type: 'SET_TEMPERAMENTOS',
                payload: data
            }) 
            })
        }     
}

export function order(orden){
   
    return{
        type:"ORDER",
        payload:orden 
    }
}

export function orderTemps(orden){
    return{
        type:"ORDER_TEMPS",
        payload:orden 
    }
}

export function eliminarDog(id){
    const URL="http://localhost:3001/dogs/"+id;
    return(dispatch)=>{
        axios.delete(URL).then(({data})=>{
            return dispatch({
                type:'ELIMINAR',
                payload:data
            })
        })
        .catch(error=>error.message)
    }
}