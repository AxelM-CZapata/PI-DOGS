const axios=require('axios');
const {Temperament}=require('../db')
require('dotenv').config()
const {API_KEY}=process.env
const URL='https://api.thedogapi.com/v1/breeds?api_key='+API_KEY

async function agregarTemps(){
    const {data}=await axios(URL)
    let filtroTemps;
    const filtrado=[];
    data.forEach(element => {
       if(element.temperament){
         filtroTemps=element.temperament.split(', ');
         for(let e of filtroTemps){
            // filtro los temps para que no se repitan
            if(!filtrado.includes(e)){
                filtrado.push(e)
            }
        }
       }   
    });
    filtrado.forEach(async e=>{
       await Temperament.create({
            nombre: e
        })
    })
}

module.exports=agregarTemps;