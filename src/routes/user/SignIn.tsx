import { useEffect, useState } from "react";
import { UserProps, sign_in } from "./user";
import { useNavigate } from "react-router-dom";

type Response = {
    success: boolean,
    message: string
}
export default function SignIn({user,setUser, setLoggedIn}: UserProps){

    const navigate = useNavigate();
    const [res, setRes] = useState<Response | null>(null);
    useEffect(()=>{
        if(res?.success == true){
            setLoggedIn(true);
            navigate('/home'); 
        }
    }, [res])

    return (
        <>
        <form method='post' onSubmit={(e)=> {
                e.preventDefault(); 
            }}>
                <ul> 
                    <li>
                        <label htmlFor='username'>Username:</label>
                        <input type="text" id='username' name='username' 
                        onChange={(e)=>{
                            setUser({username:e.currentTarget.value, password: user.password})
                        }
                        }/>
                    </li>
                    <li>
                        <label htmlFor='password'>Password:</label>
                        <input type="password" id='password' name='password'
                        onChange={(e)=>setUser({username:user.username, password:e.currentTarget.value})}/>
                    </li>
                    <li>
                        <button type="submit" onClick={async ()=>{
                            setRes(await sign_in(user))
                        }}>Login In</button>
                    </li>
                    <li>
                        {res?.message}
                    </li>
                </ul>   
            </form>
        </>
    )
}