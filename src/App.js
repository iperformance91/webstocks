
import Home from './screens/Home';
import {BrowserRouter as Router , Routes , Route} from "react-router-dom";
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Signup from './screens/Signup.jsx';
import { CartProvider } from './components/CartProvider.jsx';
import Cart from './screens/Cart.jsx';
import Orders from './screens/Orders.jsx';
import Display from './screens/Display.jsx';
import Microsoft from './screens/Microsoft.jsx';



function App() {
  return (
    <CartProvider>

  <Router>
    <div>
    <Routes>
    {/* <Route path='/' element={<Login/>} /> */}
      <Route path='/home' element={<Home/>} />
      <Route path='/signup' element= {<Signup/>}/>
      <Route path='/cart' element = {<Cart/>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/orders' element = {<Orders/>}/>
      <Route path='/' element = {<Display/>}/>
      <Route path='/display' element = {<Display/>}/>
      <Route path='/microsoft' element={<Microsoft/>} />
      
    
    </Routes>
    </div>
  </Router>
    </CartProvider>)
}

export default App;
