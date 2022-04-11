import NavBar from './Components/Navbar';
import Banner from './Components/Banner';
import About from './Components/About';
import Favorites from './Components/Favorites';
import Body from './Components/Body';
import './App.css';
import{BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path='/favorites' element={<Favorites/>} />
      <Route path='/about' element={<About/>}/>
      <Route path='/' element={<><Banner/><Body/></>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
