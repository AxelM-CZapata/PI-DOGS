
export default async function nameValidate(event,dogs){
    const dogs2=await dogs
    const change=event.target.value
    const validate=dogs2.filter(e=>e.name.toLowerCase().includes(change.toLowerCase()))
    const nameDog=[]
    for(let e of validate)
    nameDog.push(e.name)
    if(change==='')
        return ''
    if(validate.length===0)
     return 'el perro se creara con exito'
    return nameDog
   
}