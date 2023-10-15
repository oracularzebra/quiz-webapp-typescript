import axios from "axios"
import { backendUrl } from "../../App"
import { Questions, TestTime } from "../test/test";

export interface ResultReq{
    questions_id: number[]
    markedOptions: string[],
    duration : TestTime,
    username : string,
    category: string,
    difficulty: string,
}
export interface ResultRes{
    success: boolean,
    marks: number,
    correct_marked_questions_id: number[],
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
            'marked_options': JSON.stringify(req.markedOptions),
            'duration' : JSON.stringify(req.duration),
            'username': req.username,
            'category': req.category,
            'difficulty': req.difficulty
        }
    })
    return result.data.data;
}