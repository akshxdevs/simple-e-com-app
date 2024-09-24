import './App.css'
import { BrowserRouter as Router , Routes, Route  } from "react-router-dom";
import { Signup } from './Signup';
import { Login } from './Login';
import { Home } from './Home';
function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
      </Router>
    
  )
}

export default App;
