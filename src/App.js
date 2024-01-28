import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import { Login } from "./components/Login";
import { WithdrawAmount } from "./components/WithdrawAmount";
import { DepositAmount } from "./components/DepositAmount";
import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar";
import LoginState from "./context/LoginState";
import { Profile } from "./components/Profile";

function App() {

  return (
    <>
      <LoginState>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="login" element={<Login/>} />
            <Route path="withdraw" element={<WithdrawAmount />}/>
            <Route path="deposit" element={<DepositAmount />}/>
            <Route path="profile" element={<Profile/>} />
          </Routes>
        </BrowserRouter>
      </LoginState>
    </>
  );
}

export default App;
