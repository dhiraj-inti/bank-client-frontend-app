import React, { useEffect, useState } from "react"

export const Profile = () => {

    const [user,setUser] = useState(null)
    const [accounts, setAccounts] = useState([])

    const fetchUser = async()=>{
        const SERVER = process.env.REACT_APP_SERVER_BACKEND;
        const PORT = process.env.REACT_APP_PORT_BACKEND;
        const response = await fetch(`http://${SERVER}:${PORT}/api/users/getuser`,{
          method:'POST',
          headers: {
            "token": localStorage.getItem('token')
          }
        })
    
        const res = await response.json()
        if(res.success){
            setUser(res.user)
            setAccounts(res.user.accounts)
            console.log(res);
        }
    }

    useEffect(()=>{
        fetchUser();
    },[])

    return(
        <div>
            {user!==null && (<><h2>Your profile:</h2>
            <table className="table-info table">
                <tbody>
                    <tr>
                        <td><b>Id</b></td>
                        <td>{user.id}</td>
                    </tr>
                    <tr>
                        <td><b>Username</b></td>
                        <td>{user.username}</td>
                    </tr>
                    <tr>
                        <td><b>Full Name</b></td>
                        <td>{user.fullName}</td>
                    </tr>
                    <tr>
                        <td><b>Contact</b></td>
                        <td>{user.contact}</td>
                    </tr>
                </tbody>
            </table></>)}

            {accounts.length > 0 && (<><h2>Your Accounts:</h2>
            <table className="table-info table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Account Number</th>
                        <th scope="col">Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map((ele,ind)=>{
                        return(
                            <tr key={ind}>
                                <td>{ind+1}</td>
                                <td>{ele.id}</td>
                                <td>{ele.balance}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table></>)}
        </div>
    );
}