import { useEffect, useState } from "react";
import { getLeaders, Leader } from "./leaderboard";
import { useNavigate } from "react-router-dom";

interface LeaderBoardProps {
  category: string | null,
  difficulty: string | null
}
function LeaderBoard(props:LeaderBoardProps){

  const [leaders, setLeaders] = useState<Leader[] | null>(null);
  
  const navigate = useNavigate();
  
  useEffect(()=>{
    (async()=>{
      console.log(props.category, props.difficulty);
      if(props.category == null || props.difficulty == null) navigate('/');
      else {
        const result = await getLeaders(props?.category!, props?.difficulty!);
        console.log(result.data);
        if(result.success) setLeaders(result.data);
      }
    })()
},[])
    return (
        <div className="flex flex-col place-items-center">  
          <h1>Leaderboard</h1>
          <table>
            <thead>
              <tr>
                <th>username</th>
                <th>combined_score</th>
                <th>marks</th>
                <th>duration</th>
              </tr>
            </thead>
            <tbody>
            {leaders?.map((leader,index)=>{
            return (
              <tr className="text-center" key={index}>
                <td>{leader.username}</td>
                <td>{leader.combined_score}</td>
                <td>{leader.marks}</td>
                <td>
                    {leader.duration.min}min 
                    {leader.duration.sec}sec
                </td>
              </tr>
            )
          })} 
            </tbody>
          </table>
        </div>
    )
}
export default LeaderBoard;