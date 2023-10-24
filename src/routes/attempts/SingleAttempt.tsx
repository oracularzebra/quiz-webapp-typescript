import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { getAttempt } from "./previousAttempts";
import { ResultReq, ResultRes } from "../result/result";

export default function SingleAttempt(){

    const navigate = useNavigate();
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
    <div className="grid">
            {
                result == null
                ?
                <>loading...</>
                :
                <>
                <h2 className="text-center text-lg">
                {result!.category}:{result!.difficulty}                
                <br />
                Marks:
                {result!.marks}/{result.questions.data.length}
                <br />
                Time Taken:
                {result.duration.min}min
                {result.duration.sec}sec,
                Total Duration:
                {result.questions.data.length-1}min
                59sec
                </h2>
                <ul
                className="flex place-content-center gap-2 m-5" 
                style={{listStyle:'none'}}>
                    <li
                    className="p-1 rounded-xl" 
                    style={{backgroundColor:"green"}}>correct</li>
                    <li 
                    className="p-1 rounded-xl" 
                    style={{backgroundColor:"orange"}}>Attempted and correct</li>
                    <li
                    className="p-1 rounded-xl" 
                    style={{backgroundColor:"red"}}>Attempted and wrong</li>
                </ul>
                {result.questions.data.map((obj, index1)=>
                    (<div
                    className="text-lg"
                    key={obj.id}>
                        Q{index1+1}{obj.question}
                        <ul style={{listStyle:'none'}}>
                        {obj.options.map((op, index2)=>
                            {
                            const correct_answer = result.correct_answers[index1];
                            const marked_option = req.marked_options[index1];
                            return <li
                                className="p-2"
                                key={index2} style={{
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
            <div 
            className="place-self-center">
              <button
              className="bg-slate-400 rounded p-2 m-1"
              onClick={()=>navigate(`/test/${result?.category}/${result?.difficulty}`)}
              >Retake Test</button>
              <button
              className="bg-slate-400 rounded p-2 m-1"
              onClick={()=>navigate('/home')}>Return to home</button>
            </div>
        </div>
    )
    

}