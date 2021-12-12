import "./app.css";
import Home from "./components/pages/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccountList from "./components/pages/accountList/AccountList";
import Account from "./components/pages/accounts/Account";
import NewAccount from "./components/pages/newAccount/NewAccount";
import Chart from "./components/pages/analytics/Chart";
import Login from "./components/pages/login/Login";
import Navbar from "./components/navbar/Navbar";
import { useState } from "react";
import AuthContextProvider from "./contexts/authContext";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import AccContextProvider from "./contexts/accContext";
import CitizenContextProvider from "./contexts/citizenContext";
import Population from "./components/pages/population/Population";
import Individual from "./components/pages/population/Individual";
import ContainerAccount from "./components/pages/accounts/ContainerAccount";


function App() {
  const [success, setSuccess] = useState(true);
  return (
    <AuthContextProvider>
      <AccContextProvider>
        <CitizenContextProvider>
          <Router>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/login" element={<Login />} />
            </Routes>
            {success && (
              <div className="container">
                <Routes>
                  <Route exact path="/" element={<ProtectedRoute />}>
                    <Route exact path="home" element={<Home />} />
                    <Route path="accounts" element={<AccountList />} />
                    <Route
                      path="accounts/:accountID"
                      element={<ContainerAccount />}
                    />
                    <Route path="newAccount" element={<NewAccount />} />
                    <Route exact path="analytics" element={<Chart />} />
                    <Route exact path="population" element={<Population />} />
                    <Route path="population/:personID" element={<Individual />} />
                  </Route>
                </Routes>
              </div>
            )}
          </Router>
        </CitizenContextProvider>
      </AccContextProvider>
    </AuthContextProvider>
  );
}

export default App;
