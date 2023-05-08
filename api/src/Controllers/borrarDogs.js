const { Dog } = require('../db')
const obtenerRazas=require('../Controllers/obtenerRazas')
async function borrar(id2){
    await Dog.destroy({where:{id:id2}})
    const newDog=await obtenerRazas()
    return newDog
}

module.exports=borrar;