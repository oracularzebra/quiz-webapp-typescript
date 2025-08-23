import { Link } from "react-router-dom"

export default function Landing(){

    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-6 py-16">
                {/* Hero Section */}
                <div className="text-center mb-16 fade-in">
                    <h1 className="text-6xl font-bold mb-6 gradient-text">
                        Welcome to QuizMaster! 🎯
                    </h1>
                    <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                        Test your knowledge, challenge your friends, and track your progress 
                        with our interactive quiz platform featuring multiple categories and difficulty levels.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="card p-8 text-center">
                        <div className="text-4xl mb-4">📚</div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">Multiple Categories</h3>
                        <p className="text-gray-600">Choose from various quiz categories and subcategories</p>
                    </div>
                    <div className="card p-8 text-center">
                        <div className="text-4xl mb-4">🏆</div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">Leaderboards</h3>
                        <p className="text-gray-600">Compete with others and climb the rankings</p>
                    </div>
                    <div className="card p-8 text-center">
                        <div className="text-4xl mb-4">📈</div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">Track Progress</h3>
                        <p className="text-gray-600">Monitor your performance and improvement over time</p>
                    </div>
                </div>

                {/* Auth Section */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="card p-12 text-center">
                        <div className="mb-6">
                            <div className="text-5xl mb-4">👋</div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">Welcome Back!</h2>
                            <p className="text-gray-600 mb-8">Already have an account? Sign in to continue your quiz journey.</p>
                        </div>
                        <Link 
                            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300" 
                            to='/sign-in'>
                            🚀 Sign In
                        </Link>  
                    </div>
                    
                    <div className="card p-12 text-center">
                        <div className="mb-6">
                            <div className="text-5xl mb-4">✨</div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">Join the Fun!</h2>
                            <p className="text-gray-600 mb-8">New to QuizMaster? Create your account and start exploring amazing quizzes.</p>
                        </div>
                        <Link 
                            className="inline-block bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                            to='/sign-up'>
                            🎉 Get Started
                        </Link>            
                    </div>
                </div>
            </div>
        </div>
    )
}