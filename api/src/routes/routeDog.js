const {Router}=require("express");
const { Dog } = require('../db')
const razas=require('../Controllers/obtenerRazas')
const dogsByName=require('../Controllers/razaByName')
const dogsById=require('../Controllers/dogsById')
const createDog=require('../Controllers/createDog');
const validateRaza = require("../Controllers/validarRaza");
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
    const{image,name,altura,peso,years,temperament}=req.body
    //busco todos los nombres de las razas de mis perros en la BD
    const id= await Dog.findAll({attributes:['name']})
    const regexURL = /^(?:https?|ftp):\/\/(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[\w-./?%&=]*)?$/;
    const regexNombre = /^[a-zA-Z\s]+$/;
    const validacion=await validateRaza(name)
    try{
        //validamos que la nueva raza de perro no este en la BD
        if(id.find(e=>e.dataValues.name.toLowerCase()===name.toLowerCase()) || validacion){
            throw new Error("Esta raza de perro ya existe, por favor ingresa una raza distinta")
        }
        //validamos toda la info que nos llega en body y que se cumpla las caracteristicas para poder almacenar en nuestra BD
        if(regexURL.test(image) && regexNombre.test(name) && altura.length===2 
    && peso.length===2 && years.length===2 && temperament.length>0){
        res.json(await createDog( image,
            name,
            altura,
            peso,
            years,
            temperament))
    }else{
        throw new Error('Error en los tipos de datos')
    }
    }catch(error){
        res.status(400).json(error.message)
    }
})

module.exports= router;