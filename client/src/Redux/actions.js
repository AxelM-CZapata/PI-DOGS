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

export function setPage(p) {
    console.log(p)
    return {
        type: "SET_PAGE",
        payload: p
    };
}