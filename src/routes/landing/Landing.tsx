import { Link } from "react-router-dom"

export default function Landing(){

    return (
        <>
            <Link to='/sign-in'>Login In</Link>            
            <Link to='/sign-up'>Register</Link>            
        </>
    )
}