const razas=require('./obtenerRazas')
const {Dog,Temperament}=require('../db')
async function dogsById(id){
    const razasT= await razas();
    const razaId=razasT.filter(e=>e.id===Number(id));
    const razasBD=razasT.filter(e=>e.id===id)
    if(razaId.length>0){
        return razaId;
    }
    if(razasBD.length>0){
        return razasBD
    }
    throw new Error('No se encontró esta raza');
}

module.exports=dogsById