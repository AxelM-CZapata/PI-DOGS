const {Router}=require("express");
const { Temperament } = require('../db');
const obtenerTemps = require("../Controllers/obtenerTemps");
const router=Router()
router.get('/',async (req,res)=>{
    
    try{
    res.json(await obtenerTemps())
    }catch(error){
        res.status(404).json(error.message)
    }
   
})
module.exports= router;