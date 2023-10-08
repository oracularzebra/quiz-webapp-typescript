import axios from "axios"
import { backendUrl } from "../../App"
import { Questions } from "../test/test";

export async function getResult(
    questions: Questions,
    marked_options: string[]
){
    
    const questions_id = questions.data.map(obj => obj.id);
    // .map(question => {
        // return question.data.id! ; 
    // })
    const result = await axios({
        method: 'post',
        url:`${backendUrl}/result`,
        headers: {
            'questions_id': JSON.stringify(questions_id),
            'marked_options': marked_options
        }
    })
    return result.data;
}