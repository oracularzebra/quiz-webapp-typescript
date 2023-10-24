import axios from "axios"
import { backendUrl } from "../../App"

export interface Leader{
  username: string,
  marks: number,
  duration: {min:number, sec:number},
  overall_marks: number
}
export async function getLeaders(
  category: string,
  difficulty: string
):Promise<Leader[]>{

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