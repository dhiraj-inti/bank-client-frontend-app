import { useState, useEffect } from "react"
import LoginContext from "./loginContext"

const LoginState = (props)=>{
    // Initialize show state from local storage or default to true
    const [show, setShow] = useState(() => {
      const storedShow = localStorage.getItem('show');
      return storedShow !== null ? JSON.parse(storedShow) : false;
    });

    // Update local storage when show state changes
    useEffect(() => {
        localStorage.setItem('show', JSON.stringify(show));
    }, [show]);
    // const [show,setShow] = useState(false);

    const getShow = ()=>{
      return show;
    }

    return (
        <LoginContext.Provider value={{show, setShow, getShow }}>
          {props.children}
        </LoginContext.Provider>
      )
}

export default LoginState;