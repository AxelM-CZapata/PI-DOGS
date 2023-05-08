const {Dog,Temperament}=require('../db')

async function createDog( imagen,name,height,weight,years,temperament){

    const newDog= await Dog.create({
    imagen,
    name,
    height,
    weight,
    years,
    })
    // console.log("Array de temperament",temperament)
    temperament.forEach(async e=>{
        // console.log("Elemento de temp",e)
        const union= await Temperament.findAll({
            where:{nombre: e}
        })
        //unir con la raza que recien creamos
        await newDog.addTemperament(union)
    })
    return 'Los datos de '+name+' han sido guardados'
}

module.exports=createDog