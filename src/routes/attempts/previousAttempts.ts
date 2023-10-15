import axios from "axios";
import { backendUrl } from "../../App";
import { ResultReq } from "../result/result";

export async function getAttempts(username:string):Promise<{success: boolean, data:ResultReq[]}>{
    const result = await axios({
        method: 'get',
        url: `${backendUrl}/getAttempts`,
        headers:{
            'username':JSON.stringify(username)
        }
    })
    return result.data;
}