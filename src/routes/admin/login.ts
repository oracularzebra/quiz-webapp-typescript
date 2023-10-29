import axios from "axios";
import { backendUrl } from "../../App";

export interface Admin{
  username: string | null,
  password: string | null
}

export interface AdminLoginRes{
  success: boolean,
  message: string
}
export async function handleLogin(admin: Admin | null):
Promise<AdminLoginRes>{

  if(admin == null){
    return {success: false, message: 'hi'};
  }
  else{
    const request = await axios({
      url:`${backendUrl}/admin/sign-in`,
      headers:{
        "username": admin.username,
        "password": admin.password
      }
    })
    return request.data;
  }
}