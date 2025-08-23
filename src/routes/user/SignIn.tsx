import { useEffect, useState } from "react";
import { UserProps, UserResponse, sign_in } from "./user";
import { useNavigate } from "react-router-dom";

export default function SignIn({user,setUser, setLoggedIn}: UserProps){

    const navigate = useNavigate();
    const [res, setRes] = useState<UserResponse | null>(null);
    useEffect(()=>{
        if(res?.success == true){
            setLoggedIn(true);
            navigate('/home'); 
        }
    }, [res])

    return (
        <div className="min-h-screen flex items-center justify-center py-12">
            <div className="card p-8 w-full max-w-md fade-in">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold gradient-text mb-2">Welcome Back! 👋</h2>
                    <p className="text-gray-600">Sign in to continue your quiz journey</p>
                </div>

                <form method='post' onSubmit={(e)=> {
                    e.preventDefault(); 
                }}>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor='username' className="block text-sm font-medium text-gray-700 mb-2">
                                👤 Username
                            </label>
                            <input 
                                type="text" 
                                id='username' 
                                name='username'
                                className="w-full"
                                placeholder="Enter your username"
                                onChange={(e)=>{
                                    setUser({username:e.currentTarget.value, password: user.password})
                                }}
                            />
                        </div>
                        
                        <div>
                            <label htmlFor='password' className="block text-sm font-medium text-gray-700 mb-2">
                                🔒 Password
                            </label>
                            <input 
                                type="password" 
                                id='password' 
                                name='password'
                                className="w-full"
                                placeholder="Enter your password"
                                onChange={(e)=>setUser({username:user.username, password:e.currentTarget.value})}
                            />
                        </div>
                        
                        <button
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300" 
                            type="submit" 
                            onClick={async ()=>{
                                setRes(await sign_in(user))
                            }}>
                            🚀 Sign In
                        </button>
                        
                        {res?.message && (
                            <div className={`text-center p-3 rounded-lg ${res.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {res.message}
                            </div>
                        )}
                    </div>   
                </form>
                
                <div className="mt-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <div className="flex items-start">
                        <div className="text-blue-400 mr-3">ℹ️</div>
                        <div>
                            <p className="text-sm text-blue-700">
                                <strong>Server Note:</strong> The server auto-suspends after 5 minutes of inactivity and may take up to 20 seconds to start.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}