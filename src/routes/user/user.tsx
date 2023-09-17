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
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}
interface Response{
    success: boolean,
    message: string
}
export function sign_in(user: User): Response{

    axios.get(backendUrl, {
        headers:{
            'Access-Control-Allow-Origin':'*',
            username: user.username,
            password: sha256(user.password!),
        }
    });

    return {
        success: false,
        message: "Please try again"
    }
}
export async function sign_up(user: User): Promise<Response>{

    console.log(user)
    const res = await axios({
        method:'post',
        url:`${backendUrl}/sign-up`,
        headers:{
            username: user.username,
            password: (user.password && user.password.length > 0 )&& sha256(user.password)
        }
    });

    console.log(res);
    return res.data;
}
