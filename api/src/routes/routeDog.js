const {Router}=require("express");
const { Dog } = require('../db')
const razas=require('../Controllers/obtenerRazas')
const dogsByName=require('../Controllers/razaByName')
const dogsById=require('../Controllers/dogsById')
const createDog=require('../Controllers/createDog');
const validateRaza = require("../Controllers/validarRaza");
const borrarDog=require("../Controllers/borrarDogs")
const router=Router()


router.get('/',async(req,res)=>{
    const {name}=req.query
    try{
    if(!name)
      return res.json(await razas());
      return res.json(await dogsByName(name))
    }catch(error){
        res.status(404).json(error.message)
    }
})

router.get('/:idRaza',async(req,res)=>{
    const {idRaza}=req.params;
    try{
        return res.json(await dogsById(idRaza))
    }catch(error){
        res.status(404).json(error.message)
    }
})


router.post('/',async(req,res)=>{
    // const temp=JSON.parse(req.body.newDog)
    // console.log(temp);
    // console.log('-----------------');
    // console.log(req.body);
    const{image,name,height,weight,years,temperament}=req.body
    //busco todos los nombres de las razas de mis perros en la BD
    const id= await Dog.findAll({attributes:['name']})
    const regexURL = /^(?:https?|ftp):\/\/(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[\w-./?%&=]*)?$/;
    ;
    const regexNombre = /^[a-zA-Z\s]+$/;
    const validacion=await validateRaza(name)
    try{
        //validamos que la nueva raza de perro no este en la BD
        if(id.find(e=>e.dataValues.name.toLowerCase()===name.toLowerCase()) || validacion){
            throw new Error("Esta raza de perro ya existe, por favor ingresa una raza distinta")
        }
        //validamos toda la info que nos llega en body y que se cumpla las caracteristicas para poder almacenar en nuestra BD
        if(regexURL.test(image) && regexNombre.test(name) && height.length>=1 
    && weight.length>=1 && years.length>=1 && temperament.length>=0){
        res.json(await createDog( 
            image,
            name,
            height,
            weight,
            years,
            temperament))
    }else{
        throw new Error('Error en los tipos de datos')
    }
    }catch(error){
        res.status(400).json(error.message)
    }
})

router.delete('/:id',async (req,res)=>{
    const {id}=req.params;
    console.log(id,"id ruta")
    try{
        res.json(await borrarDog(id))
    }catch(error){
        res.status(400).json(error.message)
    }
})

module.exports= router;