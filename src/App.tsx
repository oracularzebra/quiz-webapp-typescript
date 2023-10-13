import { useEffect, useState } from 'react';
import './App.css';
import { User } from './routes/user/user';
import { Route, Routes } from 'react-router-dom';
import SignUp from './routes/user/SignUp';
import SignIn from './routes/user/SignIn';
import Landing from './routes/landing/Landing';
import Home from './routes/home/Home';
import Test from './routes/test/Test';
import Result from './routes/result/Result';

export const backendUrl = import.meta.env.VITE_backend_url;

// export interface UserState{
//   username: string | undefined,
//   loggedIn: boolean,
// }
function App() {

  const [user, setUser] = useState<User | null>({username:null, password:null});
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  // const [userState, setUserState ] = useState<UserState | null>(null);

  useEffect(()=>{
    console.log(user);
    // if(user?.username != null)
    // setUserState({loggedIn: loggedIn, username: user.username});
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
        element={<Home username={user!.username} loggedIn={loggedIn}/>}/>
        <Route path='/test/:category/:difficulty'
        element={<Test username={user!.username} loggedIn={loggedIn}/>}/>
        <Route path='/test/result'
        element={<Result/>}/>
    </Routes>
    </>
  )
}
export default App;
