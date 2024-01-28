import React,{useState, useEffect, useContext} from "react"
import { useNavigate } from "react-router-dom";
import LoginContext from "../context/loginContext";

export const DepositAmount = () => {

    const [depositDetails, setDepositDetails] = useState({amount:0,accountNumber:-1})
    const [message,setMessage] = useState("");
    const navigate = useNavigate();
    
    const context = useContext(LoginContext);
    const {show} = context;

    const depositAmountFun = async(id,amount)=>{
        const SERVER = process.env.REACT_APP_SERVER_BACKEND;
        const PORT = process.env.REACT_APP_PORT_BACKEND;
        const response = await fetch(`http://${SERVER}:${PORT}/api/accounts/${id}/deposit/${amount}`,{
          method:'PATCH',
          headers: {
            "token": localStorage.getItem('token')
          }
        })
    
        const res = await response.json()
        return res;
    }

    const onChange = (e)=>{
        setDepositDetails({...depositDetails,[e.target.name]:e.target.value});
    }

    const onSubmit = async(e)=>{
        console.log(depositDetails);
        const res = await depositAmountFun(depositDetails.accountNumber,depositDetails.amount);
        console.log(res)
        if(res.success){
            setMessage(`Available balance: ${res.account.balance}`);
        }
    }

    useEffect(()=>{
        if(show===false){
            navigate("/login")
        }
    },[show, navigate])

    return(
        <div style={{alignItems:"center", height:"100vh", display:"flex",justifyContent:"center", flexDirection:"column"}}>
            <h2 className="my-3">Deposit Amount Form</h2>
            <div className="form-floating mb-3" style={{width:"20vw"}}>
                <input type="number" className="form-control" name="amount" id="floatingInput" placeholder="0" onChange={onChange}/>
                <label htmlFor="floatingInput">Amount to be deposited</label>
            </div>
            <div className="form-floating"  style={{width:"20vw"}}>
                <input type="number" className="form-control" name="accountNumber" id="floatingAmount" placeholder="0" onChange={onChange}/>
                <label htmlFor="floatingAmount">Account Number</label>
            </div>
            <div>
                <h5>{message}</h5>
            </div>
            <div className="col-auto">
                <button type="submit" className="btn btn-primary mb-3 my-3" onClick={onSubmit}>Deposit</button>
            </div>
        </div>
    );
}