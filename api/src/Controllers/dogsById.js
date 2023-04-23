const razas=require('./obtenerRazas')
async function dogsById(id){
    const razasT= await razas();
    const razaId=razasT.filter(e=>e.id===Number(id));
    if(!razaId.length){
        throw new Error('No se encontró esta raza')
    }
    return razaId;
}

module.exports=dogsById