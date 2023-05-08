  const axios= require('axios')
  const {Dog,Temperament}=require('../db')
  require('dotenv').config()
  const {API_KEY}=process.env
  const URL='https://api.thedogapi.com/v1/breeds?api_key='+API_KEY
//   const URL2='https://api.thedogapi.com/v1/breeds/';

  async function allRazas(){
    //le pido los datos a la api con axios
    const razas=await axios.get(URL)
    //se limpian los datos para almacenarlos en un array
    const objRazas=razas.data.map(element=>{
        let weight=element.weight.metric.split(' - ')
        let height=element.height.metric.split(' - ')
        let image=element.image.url
        let years= element.life_span.match(/\d+/g)
        // resultados de la API
        let obj={};
        let obj2={};
        let obj3={};
        if(element.temperament){
            let temp= element.temperament.split(', ')
        obj={
            id: element.id,
            name:element.name,
            weight: weight,
            height: height,
            temperament: temp,
            image:image,
            years: years
        }
    }
    if(!element.temperament)
    obj2={
        id: element.id,
        name:element.name,
        weight: weight,
        height: height,
        image:image,
        years: years
    }
    return obj3={...obj,...obj2};  
    })
    //buscamos a todos los perros de nuestra BD y creamos un array con esa data
    const dogsBD= await Dog.findAll({
        include:{
            model: Temperament,
            attributes:['nombre'], //nombre del elemento de la tabla que quiero en mis datos
            through:{
                attributes: []
            } //de mi tabla DogTemperament
        }
    })
    const perrosBD=dogsBD.map(element=>{
        return {
            id: element.id,
            name: element.name,
            height: element.height,
            weight: element.weight,
            years: element.years,
            image: element.imagen,
            temperament: element.Temperaments.map(e=>e.nombre)
        }
    })
    //Aqui buscamos al resto de razas que no vienen incluidas en el primer URL
    // const veryDogs=[]
    
    // for(let i=1; i<=50; i++){
    //     const doggi=await axios.get(URL2+i+'?api_key=live_qzeX0RbvN86K9v1IBZI8v2U9kcVzjmqMayIA8dVUDATGF5G47C3xgruaNkeCNXVx')
    //     veryDogs.push(doggi.data)
    // }
    // const filtro=[]
    // let x=0;
    // for(let i=0; i<veryDogs.length;i++){
    //     let largo=filtro.length;
    //     if(veryDogs[i].id!==objRazas[x].id){
    //         filtro.push(veryDogs[i].id);
    //     }
    //     if(largo===filtro.length)
    //     x++;
    // }

    //juntamos los datos de la api y de la BD
    const allDataDB= [...objRazas, ...perrosBD] 
    return allDataDB;
  }

module.exports= allRazas