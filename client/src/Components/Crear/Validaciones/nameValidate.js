
export async function nameValidate(event,dogs){
    const dogs2=await dogs
    const change=event.target.value
    const validate=dogs2.filter(e=>e.name.toLowerCase().includes(change.toLowerCase()))
    const nameDog=[]
    for(let e of validate)
    nameDog.push(e.name)
    if(change==='')
        return ''
    if(validate.length===0 && !validate.includes(change.toLowerCase()))
     return change
    return nameDog
   
}

export function urlValidate(event){
    const urlRegex = /^(?:https?|ftp):\/\/(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[\w-./?%&=]*)?$/;
    const valor=event.target.value;
    if(valor==='')
    return '';
    if(!urlRegex.test(valor))
    return 'Esta URL no cumple con las caracteristicas de formato';
    return valor;
}
export function altValidate(event){
    const valor=Number(event.target.value);
    if(valor===0)
    return 'La estatura minima no debe de ir vacia'
    if(!isNaN(valor)){
        if(valor>0)
        return valor
        return 'La estatura debe ser numeros positivo'
    }
    return 'Solo se aceptan numeros'
    
    // console.log(valor)
}

export function altMaxValidate(event,altMin){
    const valor=Number(event.target.value);
    if(!isNaN(valor)){
        if(valor>altMin)
        return valor
        return 'La altura debe de ser mayor a la altura minima'
    }
    return 'Solo se aceptan numeros'
}

export function Tempers(event,temps){
    const valor=event.target.value
    if(temps.includes(valor)){
    return null}
    return valor;
}

export function minPesovalidate(event){
    const valor=Number(event.target.value);
    if(valor===0)
    return 'El peso minimo no debe de ir vacío'
    if(!isNaN(valor)){
        if(valor>0)
        return valor
        return 'El peso minimo debe ser numero positivo'
    }
    return 'Solo se aceptan numeros'
}

export function maxPesovalidate(event,pesoMin){
    const valor=Number(event.target.value);
    if(!isNaN(valor)){
        if(valor>pesoMin)
        return valor
        return 'El peso debe de ser mayor al peso minimo'
    }
    return 'Solo se aceptan numeros'
}


export function añoMin(event){
    const valor=Number(event.target.value);
    if(!isNaN(valor)){
        if(valor<1)
        return 'Solo se pueden poner numeros positivos'
        return valor
    }
    return 'Solo se aceptan numeros'
}


export function añoMax(event, anioMin){
    const valor=Number(event.target.value);
    if(!isNaN(valor)){
        if(valor>anioMin)
        return valor
        return 'El año debe de ser mayor al año minimo'
    }
    return 'Solo se aceptan numeros'
}