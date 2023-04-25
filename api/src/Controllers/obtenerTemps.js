const {Temperament}= require('../db')
async function obtenerTemps(){
const temp=await Temperament.findAll({attributes:['nombre']})
const temps=[]
temp.forEach(element => {
    temps.push(element.nombre)
});
return temps
}

module.exports=obtenerTemps