import { useEffect, useState } from "react";
import { UserProps, UserResponse, sign_up } from "./user";
import { useNavigate } from "react-router-dom";

export default function SignUp({user,setUser, setLoggedIn}: UserProps){

    const navigate = useNavigate();
    const [res, setRes] = useState<UserResponse | null>(null);
    useEffect(()=>{
        if(res?.success == true){
            setLoggedIn(true);
            navigate('/home');
        }
    }, [res])

    return (
        <div>
            <form method='post' onSubmit={(e)=> {
                e.preventDefault(); 
            }}>
                <ul
                className="grid
                           absolute
                           bottom-52
                           left-52
                           top-48
                           right-48
                           m-auto
                           place-content-center
                          "
                style={{listStyle:'none'}}> 
                    <li
                      className="m-2"
                      >
                        <label htmlFor='username'>Username:</label>
                        <input type="text" id='username' name='username' 
                        onChange={(e)=>{
                            setUser({username:e.currentTarget.value, password: user.password})
                        }
                        }/>
                    </li>
                    <li
                      className="m-2"
                    >
                        <label htmlFor='password'>Password:</label>
                        <input type="password" id='password' name='password'
                        onChange={(e)=>setUser({username:user.username, password:e.currentTarget.value})}/>
                    </li>
                    <li
                    className="m-2 justify-self-center"
                    >
                        <button className="bg-slate-200 p-1 rounded-lg" type="submit" onClick={async ()=>{
                            setRes(await sign_up(user))
                        }}>Register</button>
                    </li>
                    <li
                      className="justify-self-center"
                    >
                        {res?.message}
                    </li>
                </ul>   
            </form>          
            <p
            className="flex place-content-center"
            >NOTE:The server auto-suspends after 5 minutes
              of inactivity, and may takes 20sec to start.
            </p>
        </div>
    )
}