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
        <div className="text-center">  
          <h2 className="text-2xl font-bold gradient-text mb-6">🏆 Leaderboard</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">🏅 Rank</th>
                  <th className="px-6 py-4 text-left font-semibold">👤 Username</th>
                  <th className="px-6 py-4 text-center font-semibold">🎯 Score</th>
                  <th className="px-6 py-4 text-center font-semibold">📊 Marks</th>
                  <th className="px-6 py-4 text-center font-semibold">⏱️ Duration</th>
                </tr>
              </thead>
              <tbody>
              {leaders?.map((leader,index)=>{
                const rankEmoji = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅';
                const rowBg = index % 2 === 0 ? 'bg-gray-50' : 'bg-white';
                
                return (
                  <tr className={`${rowBg} hover:bg-blue-50 transition-colors`} key={index}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">{rankEmoji}</span>
                        <span className="font-bold text-gray-800">#{index + 1}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-800">{leader.username}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-1 px-3 rounded-full">
                        {leader.combined_score}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-semibold text-green-600">{leader.marks}</td>
                    <td className="px-6 py-4 text-center text-gray-600">
                        {leader.duration.min}m {leader.duration.sec}s
                    </td>
                  </tr>
                )
              })} 
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <div className="flex items-start">
              <div className="text-blue-400 mr-3">ℹ️</div>
              <div className="text-left">
                <p className="text-sm text-blue-700">
                  <strong>Score Calculation:</strong> The combined score is calculated using: 
                  <br />
                  <code className="bg-blue-100 px-2 py-1 rounded">marks - (total_duration_in_seconds / 50)</code>
                  <br />
                  Higher marks and faster completion time result in better scores!
                </p>
              </div>
            </div>
          </div>
        </div>
    )
}
export default LeaderBoard;