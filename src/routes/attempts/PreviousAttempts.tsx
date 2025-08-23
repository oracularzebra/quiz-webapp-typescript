import { useEffect, useState } from "react"
import { PreviousAttemptsResponse, getAttempts } from "./previousAttempts"
import { useNavigate } from "react-router-dom"

interface PreviousAttemptsProps{
    username: string | null
}
export default function PreviousAttempts(props: PreviousAttemptsProps){

    const navigate = useNavigate();
    const [attempts, setAttempts] = useState<PreviousAttemptsResponse[] | null>(null);

    useEffect(()=>{
        if(props.username == null) navigate('/');
        (async function(){
            const result = await getAttempts(props.username!);
            if(result.success){
                setAttempts(result.data);
                console.log(result);
            }
        })()
    }, [])
    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-6 py-12">
                <div className="text-center mb-12 fade-in">
                    <h1 className="text-4xl font-bold gradient-text mb-4">
                        📊 Your Quiz History
                    </h1>
                    <p className="text-white/80 text-lg">
                        Review your previous quiz attempts and track your progress
                    </p>
                </div>

                {attempts != null ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {attempts.map((attempt)=>{
                            const date = new Date(attempt.attempt_date);
                            const formattedDate = date.toLocaleDateString();
                            const formattedTime = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                            
                            return (
                                <div 
                                    key={attempt.attempt_id}
                                    className="card p-6 hover:scale-105 cursor-pointer slide-in"
                                    onClick={()=>{
                                        navigate(`/attempt`, {state: attempt});
                                    }}>
                                    <div className="text-center">
                                        <div className="text-3xl mb-3">📝</div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                                            {attempt.category}
                                        </h3>
                                        <p className="text-lg text-gray-600 mb-4 capitalize">
                                            🎯 {attempt.difficulty}
                                        </p>
                                        <div className="space-y-2 text-sm text-gray-500">
                                            <p className="flex items-center justify-center">
                                                <span className="mr-2">📅</span>
                                                {formattedDate}
                                            </p>
                                            <p className="flex items-center justify-center">
                                                <span className="mr-2">🕒</span>
                                                {formattedTime}
                                            </p>
                                        </div>
                                        <button className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
                                            View Results
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="pulse-animation text-white/80 text-lg">
                            🔄 Loading your quiz history...
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}