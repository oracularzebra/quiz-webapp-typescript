import axios from "axios"
import { backendUrl } from "../../App";
import { sha256 } from "js-sha256";

export interface User{
    username:string |  null,
    password:string | null,
    registrationDate?: string,
}
export type UserProps = {
  user: User,
  loggedIn?: boolean,
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}
interface Response{
    success: boolean,
    message: string
}
export async function sign_in(user: User): Promise<Response>{

    const res = await axios({
        method:'get',
        url:`${backendUrl}/sign-in`,
        headers:{
            username: user.username,
            password: (user.password && user.password.length > 0 ) && sha256(user.password)
        }
    });
    console.log(res)
    return res.data;
}
export async function sign_up(user: User): Promise<Response>{

    const res = await axios({
        method:'post',
        url:`${backendUrl}/sign-up`,
        headers:{
            username: user.username,
            password: (user.password && user.password.length > 0 )&& sha256(user.password)
        }
    });

    return res.data;
}
