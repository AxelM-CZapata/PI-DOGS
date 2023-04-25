const razas=require('./obtenerRazas')
const {Dog}=require('../db')
async function dogsById(id){
    const razasT= await razas();
    const razaId=razasT.filter(e=>e.id===Number(id));
    const razasBD=await Dog.findAll()
    if(razaId.length>0){
        return razaId;
    }
    console.log(razasBD)
    const razaIdBd=razasBD.filter(e=>e.id===id);
    if(razaIdBd.length>0){
        return razaIdBd
        
    }
    throw new Error('No se encontró esta raza');
}

module.exports=dogsById