const initialState={
    paginate:1,
    characters:[],
    copyChar:[],
    temperamentos:[],
    error:null
}

export default function rootReducer(state=initialState,action){
    switch(action.type){
        case 'pagina': 
        return {...state,
            paginate: action.payload
        }
        case 'SET_PAGE':
            return{
                ...state,
                paginate:action.payload
            }
        case 'SET_CHARACTER':{
            return{
                ...state,
                characters: [...action.payload],
                copyChar: [...action.payload]
            }
        }
        case 'SET_SEARCH':{
            return{
                ...state,
                characters:[...action.payload],
            }
        }
        case 'ERROR':{
            return{
                ...state,
                error:action.payload
            }
        }
        case 'SET_TEMPERAMENTOS':{
            return{
                ...state,
                temperamentos: [...action.payload]
            }
        }
        case 'ORDER':{
            if(action.payload==='A'){
            return{
                ...state,
                characters:state.characters.sort((a,b)=>a.name.localeCompare(b.name))
            }};
            if(action.payload==='D'){
            return{
                ...state,
                characters:state.characters.sort((a,b)=>b.name.localeCompare(a.name))}};

                if(action.payload==='Pmin'){
                    const filtros=state.characters.filter(e=>e.weight[0]!=='NaN')
                    return{
                        ...state,
                        characters:filtros.sort((a,b)=>{
                            if (Number(a.weight[0]) > Number(b.weight[0])) {
                                return 1;
                            }
                            if (Number(b.weight[0]) > Number(a.weight[0])) {
                                return -1;
                            }
                            return 0;
                        })
                    }
                }

                if(action.payload==='Pmax'){
                    const filtros=state.characters.filter(e=>e.weight[1]!=='NaN' && e.weight[1]!==undefined)
                    return{
                        ...state,
                        characters:filtros.sort((a,b)=>{
                            if (Number(a.weight[1]) > Number(b.weight[1])) {
                                return -1;
                            }
                            if (Number(b.weight[1]) < Number(a.weight[1])) {
                                return 1;
                            }
                            return 0;
                        })
                    }
                }
                if(action.payload==='all'){
                    return{
                        ...state,
                        characters:[...state.copyChar]
                    }
                }
                if(action.payload==='user'){
                    return{
                        ...state,
                        characters:state.copyChar.filter(e=>typeof e.id==='string')
                    }
                }
                    return{
                        ...state,
                        characters:state.copyChar.filter(e=>typeof e.id==='number')
                    }
                
        }
        case "ORDER_TEMPS":{
            // const filtro=state.copyChar.filter(e=>e.temperament?.length>0)
            const filtro= state.copyChar.filter(e=>{return action.payload.every(temperamentos=>{
                return e.temperament?.includes(temperamentos)
            })})
            return{
                ...state,
                characters:[...filtro],
                error:filtro.length===0?'No hay perros con estas caracteristicas':null
            }
        }
        case "ELIMINAR":{
            return{
                ...state,
                characters: [...action.payload] ,
                copyChar: [...action.payload] 
            }
        }
        default: return state;
    }
}