import './App.css'
import { BrowserRouter as Router , Routes, Route  } from "react-router-dom";
import { Signup } from './Signup';
import { Login } from './Login';
import { Home } from './Home';
import { Cart } from './Cart';
import { Checkout } from './Checkout';
import { Payment } from './Payment';
function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/payment' element={<Payment/>}/>
        </Routes>
      </Router>
    
  )
}

export default App;
