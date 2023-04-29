import './App.css';
import Nav from './Components/Nav/Nav'
import Cards from './Components/Cards/Cards'
import CrearDogs from './Components/Crear/CrearDogs';
import {Routes,Route} from 'react-router-dom'
function App() {
  
  return (

    <div className="App">
      <Nav/>
      <Routes>
        <Route path={"/"} element={<Cards></Cards>}/>
        <Route path="/create" element={<CrearDogs/>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
