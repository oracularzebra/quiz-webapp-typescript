import { useEffect, useState } from "react"
import { PreviousAttemptsResponse, getAttempts } from "./previousAttempts"
import { useNavigate } from "react-router-dom"

interface PreviousAttemptsProps{
    username: string | null
}
export default function PreviousAttempts(props: PreviousAttemptsProps){

    const navigate = useNavigate();
    const [attempts, setAttempts] = useState<PreviousAttemptsResponse[] | null>(null);

    useEffect(()=>{
        if(props.username == null) navigate('/');
        (async function(){
            const result = await getAttempts(props.username!);
            if(result.success){
                setAttempts(result.data);
                console.log(result);
            }
        })()
    }, [])
    return (
        <>
            {attempts != null ?attempts.map((attempt)=>{
                return (
                    <>
                        <button key={attempt.attempt_id} onClick={()=>{
                            navigate(`/attempt`, 
                            {state: attempt});
                        }}>
                        {`${attempt.attempt_date.slice(0, 15)}
                        ${attempt.category}:${attempt.difficulty}`}
                        </button>
                    </>
                )
            })
            :
            <>loading</>}
        </>
    )
}