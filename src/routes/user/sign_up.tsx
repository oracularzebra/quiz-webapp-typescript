import { useState } from "react";
import { UserProps, sign_up } from "../user/user";

type Response = {
    success: boolean,
    message: string
}
export default function SignUp({user,setUser}: UserProps){

    const [res, setRes] = useState<Response | null>(null);

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
                            setRes(await sign_up(user))
                        }}>Register</button>
                    </li>
                    <li>
                        {res?.message}
                    </li>
                </ul>   
            </form>
        </>
    )
}