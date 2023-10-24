import { Link } from "react-router-dom"

export default function Landing(){

    return (
        <div className="text-lg">
            <div 
            className="h-screen grid sm:grid-cols-2">
              <div
              className="
                  border-r-2
                  grid place-items-center
              ">
                  <p>Already a user ?</p>
                  <Link 
                  className="                             
                      bg-slate-300
                      p-2
                      marker:p-2 border-2
                      rounded-lg
                      text-lg
                      border-red-200
                      border-r-2
                  " 
                      to='/sign-in'>
                      Login In
                  </Link>  
              </div>
              <div
              className="
                  grid place-items-center
              ">
                  <p>Not an existing user ?</p>
                  <Link 
                  className="
                     bg-slate-300
                      p-2
                      marker:p-2 border-2
                      rounded-lg
                      text-lg
                      border-red-200
                      border-r-2
                  "
                      to='/sign-up'>
                      Register
                  </Link>            
              </div>
            </div>
        </div>
    )
}