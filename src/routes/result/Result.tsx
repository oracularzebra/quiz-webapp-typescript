import { useEffect } from "react"
import { Questions } from "../test/test"
import { useLocation, useNavigate } from "react-router-dom"
import { getResult } from "./result";

interface Result{
    questions: Questions[]
    markedOptions: string[],
}
export default function Result(){

    const location = useLocation();
    const navigate = useNavigate();
    const {questions, markedOptions}:Result = location.state;

    useEffect(()=>{
        //Here we will check the questionsId against 
        //marked options
        console.log(questions);
        console.log(markedOptions);
        if (questions == null) navigate('/home');

        getResult(questions, markedOptions)
    }, [])
    return (
        <>
            Result
        </>
    )
}