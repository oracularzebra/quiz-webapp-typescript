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
        <div 
        className="grid place-items-center">
            <h3 className="text-xl">
            Hello, {username} !
            </h3>
            <Categories/>
            <button
            className="text-lg bg-slate-200 rounded-lg p-2"
            onClick={()=>navigate('/attempts')}>Previous Attempts</button>
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
        <>
            {
            categories != null && expand != null
            ?
            categories.map((cat, key)=>(
                <div
                className="p-2 bg-slate-200 m-2 rounded-lg" 
                key={key}>
                    <button 
                        className="text-lg"
                        onClick={()=>{
                        const newExpand = new Array(categories.length).fill(false);
                        newExpand[key] = !expand[key];
                        setExpand(newExpand);
                    }}>{cat.category}
                    </button>
                    {
                        expand[key] &&
                        cat.sub_categories.map((sub, key) => (
                            <div className="m-2 flex flex-wrap place-items-center gap-2" key={key}>
                                <h3
                                className="p-2 text-lg border-lime-600 border-r-2"
                                >{sub}
                                </h3>
                                {Array.of('easy', 'medium', 'hard').map((level, key)=> 
                                <div key={key} className="flex place-items-center">
                                  <label
                                  className="text-lg m-2" 
                                  >
                                   <input
                                    className=""
                                    onClick={()=>handleDifficultyChange(level as DifficultyLevels)}
                                    type="radio"
                                    name="difficulty-selector"
                                    />{level}
                                  </label>
                                </div>)}
                                {/* <input type="number" max={20} min={5}/> */}
                                <button 
                                    className="text-lg bg-slate-500 rounded-lg p-2"
                                    onClick={()=>{
                                    navigate(`/test/${sub}/${difficulty}`)
                                    }
                                }>Attempt</button>
                            </div>
                        ))
                    }
                </div>
            ))
            :
            <>loading...</>
            }
        </>
    )
}