import axios from "axios"
import { backendUrl } from "../../App"

export interface LeadersRes {
  success: boolean,
  data: Leader[]
}
export interface Leader{
  username: string,
  marks: number,
  duration: {min:number, sec:number},
  combined_score: number
}
export async function getLeaders(
  category: string,
  difficulty: string
):Promise<LeadersRes>{

  const req = await axios({
    url:`${backendUrl}/getLeaders`,
    method:'get',
    headers: {
      category: category,
      difficulty: difficulty
    }
  })
  const res = req.data;
  return res;
}