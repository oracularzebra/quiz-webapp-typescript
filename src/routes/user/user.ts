import axios from "axios"
import { backendUrl } from "../../App";
import { sha256 } from "js-sha256";

export type username_type = string | null;
export type password_type = string | null;
export interface User{
    username: username_type,
    password: password_type,
    registrationDate?: string,
}
export type UserProps = {
  user: User,
  loggedIn?: boolean,
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}
export type UserResponse = {
    success: boolean,
    message: string
}
export async function sign_in(user: User): Promise<UserResponse>{

    const res = await axios({
        method:'get',
        url:`${backendUrl}/sign-in`,
        headers:{
            username: user.username,
            password: (user.password && user.password.length > 0 ) && sha256(user.password)
        }
    });
    return res.data;
}
export async function sign_up(user: User): Promise<UserResponse>{

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
