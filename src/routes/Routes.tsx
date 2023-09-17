import { ReactNode } from "react"
import App from "../App"
import SignUp from "./user/sign_up"

interface Routes {
    path: string,
    element: ReactNode
}
export const AppRoute: Routes =
    {
        path:"/",
        element:<App/>
    }

export const SignUpRoute: Routes = 
    {
        path:"/sign-in",
        element:<SignUp/>
    }