import { useNavigate } from "react-router-dom";
import { UserProps } from "../user/user";
import { useEffect, useState } from "react";
import { CatBox, getCategories } from "./category";

export default function Home({loggedIn}:Partial<UserProps>){

    const navigate = useNavigate();
    
    useEffect(()=>{
        if(!loggedIn) navigate('/');
    }, [loggedIn]);
    return (
        <>
            <Categories/>
            <PreviousAttempts/>
        </>
    )
}
function Categories(){

    const [categories, setCategories] = useState<CatBox[]|null>(null);
    const [expand, setExpand] = useState<boolean[] | null>(null);
    const navigate = useNavigate();
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
                                <input type="radio" name="difficulty-selector" id="difficulty"/>
                                <label htmlFor="difficulty">Medium</label>
                                <input type="radio" name="difficulty-selector" id="difficulty"/>
                                <label htmlFor="difficulty">Hard</label>
                                <input type="radio" name="difficulty-selector" id="difficulty"/>
                                <button onClick={()=>{
                                    //Finding difficulty
                                    navigate(`/test/${sub}/easy`)
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
function PreviousAttempts(){
    return (
        <>
            Previous Attempts
        </>
    )
}