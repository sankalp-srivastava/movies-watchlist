import NavBar from './Components/Navbar';
import Banner from './Components/Banner';
import About from './Components/About';
import './App.css';
import{BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path='/test' element={<></>} />
      <Route path='/about' element={<About/>}/>
      <Route path='/' element={<><Banner/></>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
