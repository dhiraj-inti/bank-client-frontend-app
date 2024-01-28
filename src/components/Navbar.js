import React, {useContext} from "react"
import { Link, useNavigate } from "react-router-dom";
import LoginContext from "../context/loginContext";

export const Navbar = () => {
    const context = useContext(LoginContext);
    const {show, setShow} = context;
    const navigate = useNavigate();

    const goToLogin = () =>{
        navigate("/login");
    }

    const logout = ()=>{
        localStorage.removeItem('token');
        setShow(false);
        navigate("/login")
    }



    return(
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-3 p-1">
                <Link className="navbar-brand m-1" to="/">Bank App</Link>
                <div className="collapse navbar-collapse">
                    {show && (<ul className="navbar-nav">
                        <li className="nav-item"><Link className="nav-link" to="/withdraw">Withdraw</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/deposit">Deposit</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
                    </ul>)}
                </div>
                <ul className="navbar-nav">
                	{show ? (<li className="nav-item"><button className="btn btn-primary mx-3" onClick={logout}>Logout</button></li>): (<li className="nav-item"><button className="btn btn-primary mx-3" onClick={goToLogin}>Login</button></li>)}	
                </ul>
            </nav>
        </div>
    );
}