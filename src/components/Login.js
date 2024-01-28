import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import LoginContext from "../context/loginContext";

export const Login = () => {

    const [creds,setCreds] = useState({username:"",password:""})
    const [errors, setErrors] = useState("");
    const navigate = useNavigate();

    const context = useContext(LoginContext);
    const {setShow} = context;
    

    const onChange = (e)=>{
        setCreds({...creds, [e.target.name]:e.target.value});
    }

    const onSubmit = async(e)=>{
        const SERVER = process.env.REACT_APP_SERVER_BACKEND;
        const PORT = process.env.REACT_APP_PORT_BACKEND;
        const response = await fetch(`http://${SERVER}:${PORT}/login`,{
          method:'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(creds)
        });
    
        const res = await response.json();
        
        if(res.success){
            localStorage.setItem('token',res.token);
            setErrors("");
            setShow(true);
            navigate("/")
        }
        else{
            setErrors(res.message);
            setShow(false);
        }
    
    }

    return(
        <div style={{alignItems:"center", height:"100vh", display:"flex",justifyContent:"center", flexDirection:"column"}}>
            <h2 className="my-3">Login Form</h2>
            <div className="form-floating mb-3" style={{width:"20vw"}}>
                <input type="text" className="form-control" name="username" id="floatingInput" placeholder="name@example.com" onChange={onChange}/>
                <label htmlFor="floatingInput">Username</label>
            </div>
            <div className="form-floating"  style={{width:"20vw"}}>
                <input type="password" className="form-control" name="password" id="floatingPassword" placeholder="Password" onChange={onChange}/>
                <label htmlFor="floatingPassword">Password</label>
            </div>
            <div><h6>{errors}</h6></div>
            <div className="col-auto">
                <button type="submit" className="btn btn-primary mb-3 my-3" onClick={onSubmit   }>Submit</button>
            </div>
        </div>
    );
}