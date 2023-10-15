import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { getAttempt } from "./previousAttempts";
import { ResultReq, ResultRes } from "../result/result";

export default function SingleAttempt(){

    const req:ResultReq = useLocation().state;
    const [result, setResult] = useState<ResultRes | null>(null);
    useEffect(()=>{
        console.log(req);
        (async function(){
            const res = await getAttempt(req);
            console.log(res);
            setResult(res);
        })()
    }, [])
    return (
        <>
            {result == null
                ?
                <>loading...</>
                :
                <>
                {result.category}:{result.difficulty}                
                marks 
                {result.marks}
                <br />
                {result.duration.min}min
                {result.duration.sec}sec
                <ul style={{listStyle:'none'}}>
                    <li style={{backgroundColor:"green"}}>correct</li>
                    <li style={{backgroundColor:"orange"}}>Attempted and correct</li>
                    <li style={{backgroundColor:"red"}}>Attempted and wrong</li>
                </ul>
                {result.questions.data.map((obj, index1)=>
                    (<div key={obj.id}>
                        Q{index1+1}{obj.question}
                        <ul style={{listStyle:'none'}}>
                        {obj.options.map((op, index2)=>
                            {
                            const correct_answer = result.correct_answers[index1];
                            const marked_option = req.marked_options[index1];
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