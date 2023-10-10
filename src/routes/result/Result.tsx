import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { ResultReq, ResultRes, getResult } from "./result";

export default function Result(){

    const location = useLocation();
    const navigate = useNavigate();
    const {questions_id, markedOptions}:ResultReq = location.state;
    const [result, setResult] = useState<ResultRes | null>(null);

    useEffect(()=>{
        if(questions_id == undefined || markedOptions == undefined) navigate('/home');
    }, [questions_id, markedOptions]);

    useEffect(()=>{
        (async function(){
            const result = await getResult(questions_id, markedOptions);
            setResult(result);
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
                </>
            }
        </>
    )
}