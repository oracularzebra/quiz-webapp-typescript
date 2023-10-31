import { useState } from 'react';
import { User } from './routes/user/user';
import { Route, Routes } from 'react-router-dom';
import SignUp from './routes/user/SignUp';
import SignIn from './routes/user/SignIn';
import Landing from './routes/landing/Landing';
import Home from './routes/home/Home';
import Test from './routes/test/Test';
import Result from './routes/result/Result';
import PreviousAttempts from './routes/attempts/PreviousAttempts';
import SingleAttempt from './routes/attempts/SingleAttempt';
import AdminLogin from './routes/admin/Login';
import { AdminDashBoard } from './routes/admin/DashBoard';
import NotFound from './routes/NotFound';

export const backendUrl = import.meta.env.VITE_backend_url;

function App() {

  const [user, setUser] = useState<User | null>({username:null, password:null});
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    <>
    <Header></Header> 
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
        <Route path='/attempts'
        element={<PreviousAttempts username={user!.username}/>}/>
        <Route path='/attempt'
        element={<SingleAttempt/>}/>
        <Route path='/admin/login'
        element={<AdminLogin/>}/>
        <Route path='/admin/DashBoard'
        element={<AdminDashBoard/>}/>
        <Route path='/*'
        element={<NotFound/>}/>
    </Routes>
    <Footer></Footer>
    </>
  )
}
function Header(){

  return (
    <div 
    className='grid place-items-center bg-blue-200'>
      <h1 
      className='text-3xl'>Quizze</h1>
      <p>An open-source trivial quiz website</p>
    </div>
  )
}
function Footer(){

  return (
    <div>
      
    </div>
  )
}
export default App;
