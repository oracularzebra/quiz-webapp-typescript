import { useEffect, useState } from "react"
import { getAttempts } from "./previousAttempts"
import { ResultReq } from "../result/result"
import { useNavigate } from "react-router-dom"

interface PreviousAttemptsProps{
    username: string | null
}
export default function PreviousAttempts(props: PreviousAttemptsProps){

    const navigate = useNavigate();
    const [attempts, setAttempts] = useState<ResultReq[] | null>(null);

    useEffect(()=>{
        (async function(){
            console.log(props.username);
            // if(props.username != null){
                const result = await getAttempts(props.username!);
                if(result.success){
                    setAttempts(result.data);
                }
            // }
        })()
    }, [])
    return (
        <>
            {attempts?.map(attempt=>{
                return (
                    <>
                        <button onClick={()=>{
                            navigate('/test/result', 
                            {state: attempt});
                        }}>
                            {JSON.stringify(attempt)}
                        </button>
                    </>
                )
            })}
        </>
    )
}