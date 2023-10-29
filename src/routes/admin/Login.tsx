import { useEffect, useState } from "react"
import { Admin, AdminLoginRes, handleLogin } from "./login";
import { useNavigate } from "react-router-dom";

export default function AdminLogin(){

  const navigate = useNavigate();

  const [admin, setAdmin] = useState<Admin | null>(null);
  const [res, setRes] = useState<AdminLoginRes | null>(null);

  useEffect(()=>{
    console.log(res);
    if(res?.success == true) {
      navigate('/admin/dashboard', {
        state:{username: admin?.username}
      });
    }
  },[res])

  return (
        <div>
        <form  method='post' onSubmit={(e)=> {
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
                            setAdmin({username:e.currentTarget.value, password: admin?.password!})
                        }
                        }/>
                    </li>
                    <li
                    className="m-2"
                    >
                        <label htmlFor='password'>Password:</label>
                        <input type="password" id='password' name='password'
                        onChange={(e)=>setAdmin({username:admin?.username!, password:e.currentTarget.value})}
                        />
                    </li>
                    <li 
                    className="m-2 justify-self-center"
                    >
                        <button
                        className="bg-slate-200 p-1 rounded-lg" type="submit" onClick={async ()=>{
                            setRes(await handleLogin(admin))
                            handleLogin(admin)
                        }}>Login In</button>
                    </li>
                    <li 
                    className="justify-self-center"
                    >
                        {res?.message}
                    </li>
                </ul>   
            </form>
        </div>
    )
}