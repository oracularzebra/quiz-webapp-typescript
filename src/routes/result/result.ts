import axios from "axios"
import { backendUrl } from "../../App"
import { TestTime } from "../test/test";

export interface ResultReq{
    questions_id: number[],
    markedOptions: string[],
}
export interface ResultRes{
    success: boolean,
    marks: number,
    //I need to implement this
    // timeTaken: TestTime,
}
export async function getResult(
    questions_id: number[],
    markedOptions: string[]
):Promise<ResultRes>{
    const result = await axios({
        method: 'post',
        url:`${backendUrl}/result`,
        headers: {
            'questions_id': JSON.stringify(questions_id),
            'marked_options': JSON.stringify(markedOptions)
        }
    })
    return result.data.data;
}