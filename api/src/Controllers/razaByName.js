const razas=require('./obtenerRazas')

  async function dogsByName(name){
    const todaRazas=await razas();
    const search=todaRazas.filter(dogs=>dogs.name.toLowerCase().includes(name.toLowerCase()))
    if(search.length===0){
        throw new Error('No se encontro esa raza de perro')
    }
    return search
  }

  module.exports= dogsByName;