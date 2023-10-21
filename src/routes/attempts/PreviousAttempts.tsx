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

    // Object.assign(attempts, {attemptid: number});
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
            {attempts?.map((attempt)=>{
                //we're also getting attemptid so using it here 
                //as the key
                const attemptwithId = Object.assign(attempt, {attemptid: typeof Number});
                return (
                    <>
                        <button key={attemptwithId.attemptid} onClick={()=>{
                            navigate(`/attempt`, 
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