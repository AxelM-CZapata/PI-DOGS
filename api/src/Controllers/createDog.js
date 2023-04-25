const {Dog,Temperament}=require('../db')

async function createDog( imagen,name,altura,peso,years,temperament){

    const newDog= await Dog.create({
    imagen,
    name,
    altura,
    peso,
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