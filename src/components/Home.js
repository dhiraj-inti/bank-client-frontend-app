import React,{useContext} from "react"
import LoginContext from '../context/loginContext'
export const Home = () => {
    const context = useContext(LoginContext);
    const {show} = context;
    
    return(
        <div>
            <p></p>
            <h1>This is your one stop bank app, you can deposit, withdraw amount, {show.toString()}</h1>
        </div>
    );
}