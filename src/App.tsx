import { useEffect, useState } from 'react';
import './App.css';
import { User } from './routes/user/user';
import { Route, Routes } from 'react-router-dom';
import SignUp from './routes/user/sign_up';

export const backendUrl = 'http://localhost:9001';

function App() {

  const [user, setUser] = useState<User | null>({username:null, password:null});

  useEffect(()=>{
    console.log(user);
  }, [user])
  return (
    <>
      <Routes>
          <Route path='/sign-up' 
          element={<SignUp user={user!} setUser={setUser!} />}></Route>
      </Routes>
    </>
  )
}

export default App;
