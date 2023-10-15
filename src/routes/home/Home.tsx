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
        <>
            hello {username}
            <Categories/>
            <button
            onClick={()=>navigate('/attempts')}>Previous Attempts</button>
        </>
    )
}
function Categories(){

    type DifficultyLevels = 'easy' | 'medium' | 'hard';
    const [categories, setCategories] = useState<CatBox[]|null>(null);
    const [expand, setExpand] = useState<boolean[] | null>(null);
    const navigate = useNavigate();
    const [difficulty, setDifficulty] = useState<DifficultyLevels | null>(null);

    const handleDifficultyChange = (level:DifficultyLevels)=>{
        setDifficulty(level);
    }
    useEffect(()=>{
        (async ()=>{
            const cat = await getCategories();
            console.log(cat);
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
                <div key={key}>
                    <button onClick={()=>{
                        const newExpand = new Array(categories.length).fill(false);
                        newExpand[key] = !expand[key];
                        setExpand(newExpand);
                    }}>{cat.category}
                    </button>
                    {
                        expand[key] &&
                        cat.sub_categories.map((sub, key) => (
                            <div key={key}>
                                <button>{sub}</button>
                                <label htmlFor="difficulty">Easy</label>
                                <input onClick={()=>handleDifficultyChange('easy')} type="radio" name="difficulty-selector" id="difficulty"/>
                                <label htmlFor="difficulty">Medium</label>
                                <input onClick={()=>handleDifficultyChange('medium')} type="radio" name="difficulty-selector" id="difficulty"/>
                                <label htmlFor="difficulty">Hard</label>
                                <input onClick={()=>handleDifficultyChange('hard')} type="radio" name="difficulty-selector" id="difficulty"/>
                                <button onClick={()=>{
                                    //Finding difficulty
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