import { useState } from 'react';
import { User } from './routes/user/user';
import { Link, Route, Routes } from 'react-router-dom';
import SignUp from './routes/user/SignUp';
import SignIn from './routes/user/SignIn';
import Landing from './routes/landing/Landing';
import Home from './routes/home/Home';
import Test from './routes/test/Test';
import Result from './routes/result/Result';
import PreviousAttempts from './routes/attempts/PreviousAttempts';
import SingleAttempt from './routes/attempts/SingleAttempt';
import NotFound from './routes/NotFound';

export const backendUrl = import.meta.env.VITE_backend_url;

function App() {

  const [user, setUser] = useState<User | null>({username:null, password:null});
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header></Header> 
      <main className="flex-1">
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
          <Route path='/*'
          element={<NotFound/>}/>
        </Routes>
      </main>
      <Footer></Footer>
    </div>
  )
}
function Header(){

  return (
    <div 
    className='bg-white/20 backdrop-blur-md border-b border-white/30 shadow-lg'>
      <div className='container mx-auto px-6 py-4'>
        <div className='flex items-center justify-between'>
          <Link 
          to={'/home'}
          className='text-4xl font-bold gradient-text hover:scale-105 transition-transform duration-300'>
            🧠 QuizMaster
          </Link>
          <div className='text-center'>
            <p className='text-white/90 text-sm font-medium'>
              🚀 Challenge Your Knowledge
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
function Footer(){

  return (
    <div className='bg-slate-900/20 backdrop-blur-md border-t border-white/20 mt-auto'>
      <div className='container mx-auto px-6 py-8'>
        <div className='grid md:grid-cols-3 gap-8 text-center md:text-left'>
          <div>
            <h3 className='text-white font-bold text-lg mb-3'>🧠 QuizMaster</h3>
            <p className='text-white/70 text-sm'>
              Challenge yourself with our interactive quiz platform. 
              Learn, compete, and track your progress!
            </p>
          </div>
          <div>
            <h4 className='text-white font-semibold mb-3'>Quick Links</h4>
            <div className='space-y-2'>
              <Link to='/home' className='block text-white/70 hover:text-white transition-colors text-sm'>
                🏠 Home
              </Link>
              <Link to='/attempts' className='block text-white/70 hover:text-white transition-colors text-sm'>
                📊 Previous Attempts
              </Link>
            </div>
          </div>
          <div>
            <h4 className='text-white font-semibold mb-3'>Connect</h4>
            <div className='flex justify-center md:justify-start space-x-4'>
              <span className='text-white/70 text-sm'>📧 support@quizmaster.com</span>
            </div>
          </div>
        </div>
        <div className='border-t border-white/20 mt-8 pt-6 text-center'>
          <p className='text-white/60 text-sm'>
            © 2025 QuizMaster. Made with ❤️ by Kartikey
          </p>
        </div>
      </div>
    </div>
  )
}
export default App;
