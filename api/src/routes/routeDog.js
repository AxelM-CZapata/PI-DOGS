const {Router}=require("express");
const { Dog } = require('../db')
const razas=require('../Controllers/obtenerRazas')
const dogsByName=require('../Controllers/razaByName')
const dogsById=require('../Controllers/dogsById')
const createDog=require('../Controllers/createDog')
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
    const{
        image,
        name,
        altura,
        peso,
        years,
        temperament
    }=req.body

    const regexURL = /^(?:https?|ftp):\/\/(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[\w-./?%&=]*)?$/;
    const regexNombre = /^[a-zA-Z\s]+$/;
    try{
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