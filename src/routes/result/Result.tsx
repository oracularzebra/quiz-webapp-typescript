import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { ResultReq, ResultRes, getResult } from "./result";

export default function Result(){

    const location = useLocation();
    const navigate = useNavigate();
    //here we need questions_id because we
    //would use the same page to show previous 
    //attempts.
    const {questions, markedOptions}:ResultReq = location.state;
    const [result, setResult] = useState<ResultRes | null>(null);

    useEffect(()=>{
        if(questions == undefined || markedOptions == undefined) navigate('/home');
    }, [questions, markedOptions]);

    useEffect(()=>{
        (async function(){
            const questions_id = questions?.data.map((obj:{id:number}) => obj.id);
            const result = await getResult(questions_id, markedOptions);
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
                {questions.data.map((obj, index1)=>
                    (<div key={obj.id}>
                        Q{index1+1}{obj.question}
                        <ul style={{listStyle:'none'}}>
                        {obj.options.map((op, index2)=>
                            {
                            return <li key={index2} style={{
                                color:markedOptions[index1] == op
                                ?'green': 'white'
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