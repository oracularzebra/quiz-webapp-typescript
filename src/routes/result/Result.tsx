import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { ResultReq, ResultRes, getResult } from "./result";
import LeaderBoard from "./leaderboard/LeaderBoard";

export default function Result(){

    const location = useLocation();
    const navigate = useNavigate();
    const {loggedIn} = location.state;
    const req:ResultReq = location.state;
    const [result, setResult] = useState<ResultRes | null>(null);

    useEffect(()=>{
        console.log(req);
        console.log(req.questions_id);
        if(req.questions_id == undefined || req.marked_options == undefined 
        || loggedIn == undefined || loggedIn == false) 
        navigate('/home');

    }, [req.questions_id, req.marked_options, loggedIn]);

    useEffect(()=>{
        (async function(){
            const result = await getResult(req);
            setResult(result);
            console.log(result);
        })();
    }, []);

    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-6 py-12">
                {result == null ? (
                    <div className="text-center py-12">
                        <div className="pulse-animation text-white/80 text-lg">
                            🔄 Loading results...
                        </div>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto fade-in">
                        {/* Results Header */}
                        <div className="card p-8 mb-8 text-center">
                            <h1 className="text-4xl font-bold gradient-text mb-4">
                                🎉 Quiz Results
                            </h1>
                            <div className="grid md:grid-cols-2 gap-6 text-left">
                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <span className="text-2xl mr-3">📚</span>
                                        <div>
                                            <p className="text-sm text-gray-600">Category & Difficulty</p>
                                            <p className="font-semibold text-lg">{result!.category} - {result!.difficulty}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-2xl mr-3">📊</span>
                                        <div>
                                            <p className="text-sm text-gray-600">Your Score</p>
                                            <p className="font-bold text-2xl text-green-600">
                                                {result!.marks}/{result.questions.data.length}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <span className="text-2xl mr-3">⏱️</span>
                                        <div>
                                            <p className="text-sm text-gray-600">Time Taken</p>
                                            <p className="font-semibold text-lg">
                                                {result.duration.min}m {result.duration.sec}s
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-2xl mr-3">🎯</span>
                                        <div>
                                            <p className="text-sm text-gray-600">Accuracy</p>
                                            <p className="font-bold text-xl text-blue-600">
                                                {Math.round((result!.marks / result.questions.data.length) * 100)}%
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="card p-6 mb-8">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800">📋 Answer Legend</h3>
                            <div className="flex flex-wrap justify-center gap-4">
                                <div className="flex items-center bg-green-100 px-4 py-2 rounded-lg">
                                    <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                                    <span className="text-sm font-medium text-green-700">Correct Answer</span>
                                </div>
                                <div className="flex items-center bg-orange-100 px-4 py-2 rounded-lg">
                                    <div className="w-4 h-4 bg-orange-500 rounded mr-2"></div>
                                    <span className="text-sm font-medium text-orange-700">Your Correct Answer</span>
                                </div>
                                <div className="flex items-center bg-red-100 px-4 py-2 rounded-lg">
                                    <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                                    <span className="text-sm font-medium text-red-700">Your Wrong Answer</span>
                                </div>
                            </div>
                        </div>

                        {/* Questions Review */}
                        <div className="space-y-6 mb-8">
                            {result.questions.data.map((obj, index1)=>(
                                <div className="card p-6" key={obj.id}>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                        <span className="text-blue-600">Q{index1+1}.</span> {obj.question}
                                    </h3>
                                    <div className="space-y-2">
                                        {obj.options.map((op, index2)=> {
                                            const correct_answer = result.correct_answers[index1];
                                            const marked_option = req.marked_options[index1];
                                            
                                            let bgColor = 'bg-gray-100';
                                            let textColor = 'text-gray-700';
                                            let icon = '⚪';
                                            
                                            if (op === correct_answer) {
                                                if (correct_answer === marked_option) {
                                                    bgColor = 'bg-orange-100 border-orange-300';
                                                    textColor = 'text-orange-700';
                                                    icon = '🟠';
                                                } else {
                                                    bgColor = 'bg-green-100 border-green-300';
                                                    textColor = 'text-green-700';
                                                    icon = '🟢';
                                                }
                                            } else if (marked_option === op) {
                                                bgColor = 'bg-red-100 border-red-300';
                                                textColor = 'text-red-700';
                                                icon = '🔴';
                                            }
                                            
                                            return (
                                                <div
                                                    key={index2}
                                                    className={`p-4 rounded-lg border-2 ${bgColor} ${textColor} flex items-center`}>
                                                    <span className="mr-3">{icon}</span>
                                                    <span className="font-medium">{op}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Leaderboard */}
                        <div className="card p-8 mb-8">
                            <LeaderBoard category={result?.category!} difficulty={result?.difficulty!}></LeaderBoard>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-center gap-4">
                            <button
                                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                                onClick={()=>navigate(`/test/${result?.category}/${result?.difficulty}`)}>
                                🔄 Retake Test
                            </button>
                            <button
                                className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                                onClick={()=>navigate('/home')}>
                                🏠 Return to Home
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}