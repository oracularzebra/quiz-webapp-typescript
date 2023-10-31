import { Link } from "react-router-dom";

export default function NotFound(){

  return (
    <div className="text-xl text-center">
      Page does not exist, go to 
      <Link 
      className="text-blue-800"
      to={'/'}>Home</Link>
    </div>
  )
}