import axios from "axios";
import { backendUrl } from "../../App";
import { ResultReq, ResultRes } from "../result/result";

//This function will give us an array of ResultReqs
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
//We can use the above obtained ResultReqs to obtains the ResultRes
export async function getAttempt(
    req: ResultReq
):Promise<ResultRes>{
    const result = await axios({
        method: 'post',
        url:`${backendUrl}/getAttempt`,
        headers: {
            'questions_id': JSON.stringify(req.questions_id),
            'marked_options': JSON.stringify(req.marked_options),
            'duration' : JSON.stringify(req.duration),
            'username': req.username,
            'category': req.category,
            'difficulty': req.difficulty
        }
    })
    return result.data.data;
}