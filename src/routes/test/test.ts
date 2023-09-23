import axios from "axios";
import { backendUrl } from "../../App";
import { category_type } from "../home/category";
import { username_type } from "../user/user";

export type QuestionResponse = {
    success: boolean,
    data: {id:number, question:string, options:string[]}[]
}
export interface QuestionType{
    id: number,
    question: string,
    options: string[]
}
type Difficulty = 'Easy' | 'Medium' | 'Hard';
interface SingleQues{
    question_id: number,
    options: string[],
    difficulty_type: Difficulty,
}
interface Test{
    questions: SingleQues[],
}
interface Attempt{
    attemp_time: Date,
    username: username_type,
    category: category_type,
    questions_id: SingleQues[],
    difficulty_type: string,
}
export async function getQuestions(category:string, difficulty:string):Promise<QuestionResponse>{
    
    const result = await axios({
        method: 'get',
        url: `${backendUrl}/questions`,
        headers:{
            category: category,
            difficulty: difficulty,
            type: 'multiple',
        }
    })
    if(result.data.success){
        //result.data = {success:true, data:[filled]};
        return result.data;
    }
    return {success: false, data:[]};
}