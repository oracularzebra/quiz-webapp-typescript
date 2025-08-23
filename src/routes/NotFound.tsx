import { Link } from "react-router-dom";

export default function NotFound(){

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center fade-in">
        <div className="text-8xl mb-8">😕</div>
        <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white/90 mb-6">
          Oops! Page Not Found
        </h2>
        <p className="text-lg text-white/70 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track!
        </p>
        <div className="space-y-4">
          <Link 
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            to={'/'}>
            🏠 Go to Home
          </Link>
          <br />
          <Link 
            className="inline-block bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            to={'/home'}>
            📚 Browse Quizzes
          </Link>
        </div>
      </div>
    </div>
  )
}