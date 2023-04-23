const {Dog,Temperament}=require('../db')

async function createDog( imagen,
    name,
    altura,
    peso,
    years,
    temperament){
    const newDog= await Dog.create({
    imagen,
    name,
    altura,
    peso,
    years,
    })
    return 'Los datos de '+name+' han sido guardados'
}

module.exports=createDog