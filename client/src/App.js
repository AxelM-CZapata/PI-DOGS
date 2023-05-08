import './App.css';
import Nav from './Components/Nav/Nav'
import Cards from './Components/Cards/Cards'
import CrearDogs from './Components/Crear/CrearDogs';
import Detail from './Components/Detail/Detail';
import {Routes,Route,useLocation} from 'react-router-dom'
import Landing from './Components/Landing/Landing';
function App() {
  const location=useLocation();
  return (

    <div className="App">
      {location.pathname!=='/'&& <Nav/>}
      <Routes>
        <Route path='/' element={<Landing></Landing>}></Route>
        <Route path={"/home"} element={<Cards></Cards>}/>
        <Route path="/create" element={<CrearDogs/>}></Route>
        <Route path="/detail/:id" element={<Detail/>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
