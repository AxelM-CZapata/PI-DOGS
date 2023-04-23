  const axios= require('axios')
  const {Dog,Temperament}=require('../db')
  const createTemp=require('../Controllers/createTemp')
  require('dotenv').config()
  const {API_KEY}=process.env
  const URL='https://api.thedogapi.com/v1/breeds?api_key='+API_KEY

  const filtroTemp=[]

  function temperement(temp){
    for(let e of temp){
        // filtro los temps para que no se repitan
        if(!filtroTemp.includes(e)){
            filtroTemp.push(e)
        }
        
    }
  }
  //agrego todos los temperamentos a la BD
  async function agregarTemps(){
    const Temps= await Temperament.findAll()
    if(Object.keys(Temps).length===0){
    filtroTemp.forEach(async (element)=>{
        await Temperament.create({
            nombre: element
            })
        })
    }
  }

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
            temperement(temp)
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
    const dogsBD= await Dog.findAll()
    const perrosBD=dogsBD.map(element=>{
        return {
            id: element.id,
            name: element.name,
            altura: element.altura,
            peso: element.peso,
            years: element.years,
            imagen: element.imagen
        }
    })
    //juntamos los datos de la api y de la BD
    const allDataDB= [...objRazas, ...perrosBD]
    await agregarTemps();
    return allDataDB;
  }

module.exports= allRazas