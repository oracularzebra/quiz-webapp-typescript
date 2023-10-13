import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { ResultReq, ResultRes, getResult } from "./result";

export default function Result(){

    const location = useLocation();
    const navigate = useNavigate();
    //here we need questions_id because we
    //would use the same page to show previous 
    //attempts.
    const loggedIn = location.state;
    const {questions, markedOptions, duration}:ResultReq = location.state;
    const [result, setResult] = useState<ResultRes | null>(null);

    useEffect(()=>{
        if(questions == undefined || markedOptions == undefined 
        || loggedIn == undefined || loggedIn == false) 
        // )
        navigate('/home');
    }, [questions, markedOptions, loggedIn]);

    useEffect(()=>{
        (async function(){
            const questions_id = questions?.data.map((obj:{id:number}) => obj.id);
            const result = await getResult(questions_id, markedOptions, duration);
            setResult(result);
            console.log(result);
        })();
    }, []);

    return (
        <>
            {
                result == null
                ?
                <>loading...</>
                :
                <>marks 
                {result!.marks}
                <br />
                {result.duration.min}min
                {result.duration.sec}sec
                <ul style={{listStyle:'none'}}>
                    <li style={{backgroundColor:"green"}}>correct</li>
                    <li style={{backgroundColor:"orange"}}>Attempted and correct</li>
                    <li style={{backgroundColor:"red"}}>Attempted and wrong</li>
                </ul>
                {questions.data.map((obj, index1)=>
                    (<div key={obj.id}>
                        Q{index1+1}{obj.question}
                        <ul style={{listStyle:'none'}}>
                        {obj.options.map((op, index2)=>
                            {
                                //show green color on the correct
                                //option and red color on the incorrect
                                //marked by you
                            const correct_answer = result.correct_answers[index1];
                            const marked_option = markedOptions[index1];
                            return <li key={index2} style={{
                                color: op == correct_answer ? 
                                correct_answer == marked_option ? 'yellow' : 'green' :
                                marked_option == op ? 'red' 
                                : 'white'
                            }}>
                                {op}
                            </li>}
                        )}
                        </ul>
                    </div>)
                )}
                </>
            }
        </>
    )
}