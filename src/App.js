import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favourite from './Components/Favourite';
// import Info from './Components/Info';
import About from './Components/About';
import{BrowserRouter as Router,Routes,Route,Outlet} from 'react-router-dom'

function App() {
  return (
 <Router>
 <Navbar/>
 <Routes>
 {/* <Route path='/' element={<><Banner/></>}/> */}
 <Route path='/' element={<><Banner/><Movies/></>}/>
 <Route path='/favourites' element={<Favourite/>}/>
 <Route path='/about' element={<About/>}/>
 </Routes>
 {/* <Banner/>
 <Movies/>
 <Favourite/> */}
 </Router>

  );
}

export default App;
