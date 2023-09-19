import { useNavigate } from "react-router-dom";
import { UserProps } from "../user/user";
import { useEffect, useState } from "react";
import { CatBox, getCategories } from "./category";

export default function Home({loggedIn, user}:Partial<UserProps>){

    const navigate = useNavigate();
    const [categories, setCategories] = useState<CatBox[]|null>(null);
    const [expand, setExpand] = useState<boolean[] | null>(null);

    useEffect(()=>{
        if(!loggedIn) navigate('/');
        else{
            (async ()=>{
                const cat = await getCategories();
                console.log(cat);
                if(cat.success){
                    setCategories(cat.data);
                }
                setExpand(new Array(cat.data.length).fill(false));
            })();
        }
    }, [loggedIn])
    return (
        <>
            {
            categories != null && expand != null
            ?
            categories.map((cat, key)=>(
                <>
                    <button key={key} onClick={()=>{
                        const newExpand = new Array(categories.length).fill(false);
                        newExpand[key] = !expand[key];
                        setExpand(newExpand);
                    }}>{cat.category}
                    </button>
                    {
                        expand[key] &&
                        cat.sub_categories.map(sub => (
                            <>
                                {sub}
                            </>
                        ))
                    }
                </>
            ))
            :
            <>loading...</>
            }
        </>
    )
}