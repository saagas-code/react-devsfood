import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home';
import { useEffect, useContext } from 'react';
import { NotFound } from './pages/NotFound/index';
import { AuthContext } from './contexts/AuthContext';
import { RequireAuth } from './contexts/RequireAuth';
import { SignIn } from './pages/SignIn/index';
import { Orders } from './pages/Orders';
import { SignUp } from './pages/SignUp2/index';





function App() {
  const auth = useContext(AuthContext);
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    if(token) {
        let request = async () => {
            let json = await auth.request(token)
        }
        request() 
    }
  }, [navigate])
  

  return (
      <>
        
        
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/orders' element={<RequireAuth><Orders/></RequireAuth>} />
          <Route path='/login' element={<SignIn/>}/>
          <Route path='/register' element={<SignUp/>} />
          <Route path='*' element={<NotFound/>} />
        </Routes>


      </>
  );
}

export default App;
