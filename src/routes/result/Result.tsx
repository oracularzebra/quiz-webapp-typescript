import { useEffect } from "react"
import { Questions } from "../test/test"
import { useLocation, useNavigate } from "react-router-dom"

interface Result{
    questions: Questions
    markedOptions: string[],
}
export default function Result(){

    const location = useLocation();
    const navigate = useNavigate();
    const {questions, markedOptions}:Result = location.state;

    useEffect(()=>{
        //Here we will check the questionsId against 
        //marked options
        console.log('result questions');
        if (questions == null) navigate('/home');
    }, [])
    return (
        <>
            Result
        </>
    )
}