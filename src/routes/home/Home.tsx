import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CatBox, getCategories } from "./category";

interface UserProps{
    username: string | null,
    loggedIn: boolean
}
export default function Home({username, loggedIn}:UserProps){

    const navigate = useNavigate();
    
    useEffect(()=>{
        if(!loggedIn) navigate('/');
    }, [loggedIn]);
    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-6 py-12">
                <div className="text-center mb-12 fade-in">
                    <h1 className="text-4xl font-bold mb-4 gradient-text">
                        Welcome back, {username}! 👋
                    </h1>
                    <p className="text-white/80 text-lg">
                        Ready to challenge yourself? Choose a category and start your quiz journey!
                    </p>
                </div>
                
                <div className="max-w-6xl mx-auto">
                    <Categories/>
                    
                    <div className="text-center mt-12">
                        <button
                            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                            onClick={()=>navigate('/attempts')}>
                            📊 View Previous Attempts
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
function Categories(){

    type DifficultyLevels = 'easy' | 'medium' | 'hard';
    const [categories, setCategories] = useState<CatBox[]|null>(null);
    const [expand, setExpand] = useState<boolean[] | null>(null);
    const navigate = useNavigate();
    const [difficulty, setDifficulty] = useState<DifficultyLevels | null>('easy');

    const handleDifficultyChange = (level:DifficultyLevels)=>{
        setDifficulty(level);
    }
    useEffect(()=>{
        (async ()=>{
            const cat = await getCategories();
            if(cat.success){
                setCategories(cat.data);
            }
            setExpand(new Array(cat.data.length).fill(false));
        })();
    }, []);

    return (
        <div className="space-y-6">
            {
            categories != null && expand != null
            ?
            categories.map((cat, key)=>(
                <div className="card p-6 slide-in" key={key}>
                    <button 
                        className="w-full text-left text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300 flex items-center justify-between"
                        onClick={()=>{
                        const newExpand = new Array(categories.length).fill(false);
                        newExpand[key] = !expand[key];
                        setExpand(newExpand);
                    }}>
                        <span className="flex items-center">
                            📚 {cat.category}
                        </span>
                        <span className={`transform transition-transform duration-300 ${expand[key] ? 'rotate-180' : ''}`}>
                            ⬇️
                        </span>
                    </button>
                    {
                        expand[key] &&
                        <div className="mt-6 space-y-4 fade-in">
                            {cat.sub_categories.map((sub, key) => (
                                <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-500" key={key}>
                                    <div className="flex flex-wrap items-center gap-4 mb-4">
                                        <h3 className="text-lg font-medium text-gray-800 flex items-center">
                                            🎯 {sub}
                                        </h3>
                                    </div>
                                    
                                    <div className="flex flex-wrap items-center gap-6">
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm font-medium text-gray-600">Difficulty:</span>
                                            {Array.of('easy', 'medium', 'hard').map((level, key)=> 
                                            <label key={key} className="flex items-center cursor-pointer group">
                                                <input
                                                    className="mr-2 w-4 h-4 text-blue-600 accent-blue-600"
                                                    onClick={()=>handleDifficultyChange(level as DifficultyLevels)}
                                                    type="radio"
                                                    name="difficulty-selector"
                                                    defaultChecked={level === 'easy'}
                                                />
                                                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 capitalize">
                                                    {level === 'easy' ? '🟢 Easy' : level === 'medium' ? '🟡 Medium' : '🔴 Hard'}
                                                </span>
                                            </label>)}
                                        </div>
                                        
                                        <button 
                                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                                            onClick={()=>{
                                            navigate(`/test/${sub}/${difficulty}`)
                                            }}>
                                            🚀 Start Quiz
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            ))
            :
            <div className="text-center py-12">
                <div className="pulse-animation text-white/80 text-lg">
                    🔄 Loading categories...
                </div>
            </div>
            }
        </div>
    )
}