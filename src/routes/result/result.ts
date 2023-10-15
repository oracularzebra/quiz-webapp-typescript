import axios from "axios"
import { backendUrl } from "../../App"
import { Questions, TestTime } from "../test/test";

export interface ResultReq{
    questions_id: number[]
    marked_options: string[],
    duration : TestTime,
    username : string,
    category: string,
    difficulty: string,
}
export interface ResultRes{
    marks: number,
    correct_answers: string[]
    questions: Questions
    duration: TestTime,
    attempt_date: Date,
    difficulty: string,
    category: string
}
export async function getResult(
    req: ResultReq
):Promise<ResultRes>{
    const result = await axios({
        method: 'post',
        url:`${backendUrl}/result`,
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