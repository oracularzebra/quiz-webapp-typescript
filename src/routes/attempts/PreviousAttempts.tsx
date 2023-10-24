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
        <div className="flex flex-wrap place-content-center">
            {attempts != null ?attempts.map((attempt)=>{
                return (
                    <div 
                    key={attempt.attempt_id}
                    className="">
                        <button
                        className="bg-slate-400 rounded-lg p-2 m-1" 
                        onClick={()=>{
                            navigate(`/attempt`, 
                            {state: attempt});
                        }}>
                        {`${attempt.attempt_date.slice(0, 21)}
                        ${attempt.category}:${attempt.difficulty}`}
                        </button>
                    </div>
                )
            })
            :
            <>loading</>}
        </div>
    )
}