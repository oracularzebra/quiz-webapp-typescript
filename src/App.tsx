import { useEffect, useState } from 'react';
import './App.css';
import { User } from './routes/user/user';
import { Route, Routes } from 'react-router-dom';
import SignUp from './routes/user/SignUp';
import SignIn from './routes/user/SignIn';
import Landing from './routes/landing/Landing';
import Home from './routes/home/Home';

export const backendUrl = 'http://localhost:9001';

function App() {

  const [user, setUser] = useState<User | null>({username:null, password:null});
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(()=>{
    console.log(user);
  }, [user])
  return (
    <>
    <Routes>
        <Route path='/'
        element={<Landing/>}/>
        <Route path='/sign-up' 
        element={<SignUp setLoggedIn={setLoggedIn} user={user!} setUser={setUser!} />}/>
        <Route path='/sign-in' 
        element={<SignIn setLoggedIn={setLoggedIn} user={user!} setUser={setUser!} />}/>
        <Route path='/home'
        element={<Home user={user!} loggedIn={loggedIn}/>}/>
    </Routes>
    </>
  )
}

export default App;
