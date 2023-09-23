import { useEffect, useState } from "react"
import { QuestionResponse, QuestionType, getQuestions } from "./test";
import { useNavigate, useParams } from "react-router-dom";
import { UserProps } from "../user/user";

export default function Test({loggedIn}:Partial<UserProps>){

    const navigate = useNavigate();
    const {category, difficulty} = useParams();
    const [questions, setQuestions] = useState<QuestionResponse | null>(null);
    
    useEffect(()=>{
        if(!loggedIn) navigate('/home');
        if(category == undefined || difficulty == undefined) navigate('/home');
        else{
            (async()=>{        
            const result = await getQuestions(category, difficulty);
            setQuestions(result);
            })();
        }
    }, [loggedIn ,category, difficulty]);
    return (
        <>
           {
           questions?.success  
           ?
            questions.data.map((item, key) => (
                <>
                    <Question
                    key={key}
                    id={key+1}
                    options={item.options}
                    question={item.question}
                    ></Question>
                    <br />
                </>
            ))
            : 
            <>loading</>
           }
        </>
    )
}
function Question(ques:QuestionType){

    return (
        <>
            {ques.id}
            {ques.question}
            <br/>
            {ques.options.map((option, key) => (
                <>
                    {option}
                    <br/>
                </>
            ))}
        </>
    )
}