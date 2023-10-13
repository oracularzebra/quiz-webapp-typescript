import axios from "axios"
import { backendUrl } from "../../App"
import { Questions, TestTime } from "../test/test";

export interface ResultReq{
    questions: Questions,
    markedOptions: string[],
    duration : TestTime,
    username : string
}
export interface ResultRes{
    success: boolean,
    marks: number,
    correct_marked_questions_id: number[],
    correct_answers: string[]
    //I need to implement this
    duration: TestTime,
    attempt_date: Date,
}
export async function getResult(
    questions_id: number[],
    markedOptions: string[],
    duration: TestTime,
):Promise<ResultRes>{
    const result = await axios({
        method: 'post',
        url:`${backendUrl}/result`,
        headers: {
            'questions_id': JSON.stringify(questions_id),
            'marked_options': JSON.stringify(markedOptions),
            'duration' : JSON.stringify(duration)
        }
    })
    return result.data.data;
}