const {Router}=require("express");
const { Temperament } = require('../db')
const router=Router()

router.get('/',(req,res)=>{
    res.send('Hola soy temperament')
})
module.exports= router;