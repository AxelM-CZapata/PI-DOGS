const initialState={
    paginate:1
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
        default: return state;
    }
}