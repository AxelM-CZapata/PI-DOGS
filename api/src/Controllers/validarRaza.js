const axios=require('axios');
require('dotenv').config();
const {API_KEY}=process.env
const URL='https://api.thedogapi.com/v1/breeds?api_key='+API_KEY

async function validateRaza(name){
    const info=await axios(URL);
    if(info.data.find(e=>e.name===name))
    return true
    return false
}

module.exports=validateRaza;