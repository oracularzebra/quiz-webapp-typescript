import axios from "axios";
import { useEffect, useState } from "react"
import { backendUrl } from "../../App";

export function AdminDashBoard(){

  const [noOfUsers, setNoOfUsers] = useState<number>(0);
  useEffect(()=>{
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