import { useEffect, useState } from "react";
import { Leader, getLeaders } from "./leaderboard";

function LeaderBoard(){

  const [leaders, setLeaders] = useState<Leader[] | null>(null);
  
  useEffect(()=>{
    (async()=>{
      const result = await getLeaders('Gadgets', 'easy');
      console.log(result);
    })();
  },[])
    return (
        <>
          
        </>
    )
}
export default LeaderBoard;