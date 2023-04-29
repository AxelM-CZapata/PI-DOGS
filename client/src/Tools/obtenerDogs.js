import axios from 'axios'

export default async function obtenerDogs(){
let dogs=await axios.get('http://localhost:3001/dogs')
return dogs.data;
}