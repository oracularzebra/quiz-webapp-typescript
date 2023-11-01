import axios from "axios";
import { useEffect, useState } from "react"
import { backendUrl } from "../../App";
import { useLocation, useNavigate } from "react-router-dom";

export function AdminDashBoard(){

  const location = useLocation();
  const {username} = location.state;

  const navigate = useNavigate();
  const [noOfUsers, setNoOfUsers] = useState<number>(0);
  useEffect(()=>{
    if(username == null) navigate('/');
    else 
      (async()=>{
        const noOfUsersReq = await axios({
          url:`${backendUrl}/admin/get-users`
        });
        //Here we are getting a full blown object
        //involving all the headers, data obj only is 
        //of need here
        setNoOfUsers(noOfUsersReq.data.data);
      })();
  }, [])
  
  return (
    <div>
      <h1 className="text-center text-xl m-2">
        Admin dashboard
      </h1>
      Total No of users {noOfUsers}
    </div>
  )
}