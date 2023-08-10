import Login from './pages/login'
import SignUp from './pages/signup';
import Subscription from './pages/subscription';
import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Subscription/>}></Route>
          <Route exact path='/login' element={<Login/>}></Route>
          <Route exact path='/signup' element={<SignUp/>}></Route>

          <Route path='*' element ={<Navigate to='/login'/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
