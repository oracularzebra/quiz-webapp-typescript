import axios from "axios";
import { backendUrl } from "../../App";

export type Questions = {
    success: boolean,
    data: {id:number, question:string, options:string[]}[]
}
export interface QuestionTypeProps{
    id: number | null,
    index: number | null,
    question: string,
    options: string[] | [],
    setMarkedOptions: React.Dispatch<React.SetStateAction<string[]>>
    markedOptions: string[]
}
export interface QuestionListProps{
    length: number,
    setSelectedQuestionId: React.Dispatch<React.SetStateAction<number | null>>
}
export async function getQuestions(category:string, difficulty:string):Promise<Questions>{
    
    const result = await axios({
        method: 'get',
        url: `${backendUrl}/questions`,
        headers:{
            category: category,
            difficulty: difficulty,            
            noofques: '15',
            type: 'multiple'
        }
    })
    if(result.data.success){
        return result.data;
    }
    return result.data;
}
export interface TestTime{
    min: number, 
    sec: number
}
export type TimerProps = {
    testTime: TestTime,
    setDuration: React.Dispatch<React.SetStateAction<TestTime | null>>,
    setEnd: React.Dispatch<React.SetStateAction<boolean>>
}
export function handleNextPrev(
    command: 'prev' | 'next',
    length:number,
    index:number | null,
    setSelectedQuestionId: React.Dispatch<React.SetStateAction<number | null>>, 
    ){
        if(command == 'next'){
            if(index == length-1){
                setSelectedQuestionId(0);
            }
            else{
                setSelectedQuestionId(index!+1);
            }
        }
        else if(command == 'prev'){
            if(index == 0){
                setSelectedQuestionId(length-1);
            }
            else{
                setSelectedQuestionId(index!-1);
            }
        }
}
export function handleMarkOption(
    current_index: number,
    already_marked:boolean,
    setMarkedOptions: React.Dispatch<React.SetStateAction<string[]>>,
    markedOption: string
):void{
    //If already marked we'll unmark it
    setMarkedOptions(options=>options.map(
      (old_option, index)=>{
          if(index == current_index) {
            if(already_marked) return 'undefined'
            else return markedOption
          };
          return old_option;
      }
    ))
}