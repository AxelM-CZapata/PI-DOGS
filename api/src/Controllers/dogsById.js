const razas=require('./obtenerRazas')
const {Dog,Temperament}=require('../db')
async function dogsById(id){
    const razasT= await razas();
    const razaId=razasT.filter(e=>e.id===Number(id));
    const razasBD=await Dog.findAll({
        include:{
            model: Temperament,
            attributes:['nombre'], //nombre del elemento de la tabla que quiero en mis datos
            through:{
                attributes: []
            } //de mi tabla DogTemperament
        }
    })
    if(razaId.length>0){
        return razaId;
    }
    const razaIdBd=razasBD.filter(e=>e.id===id);
    if(razaIdBd.length>0){
        return razaIdBd
        
    }
    throw new Error('No se encontró esta raza');
}

module.exports=dogsById