import "./app.css";
import Home from "./components/pages/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccountList from "./components/pages/accountList/AccountList";
import Account from "./components/pages/accounts/Account";
import NewAccount from "./components/pages/newAccount/NewAccount";
import Chart from "./components/pages/analytics/Chart";
import Login from "./components/pages/login/Login";
import { useState } from "react";
import AuthContextProvider from "./contexts/authContext";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import AccContextProvider from "./contexts/accContext";
import CitizenContextProvider from "./contexts/citizenContext";
import Population from "./components/pages/population/Population";
import Individual from "./components/pages/population/individual/Individual";
import ContainerAccount from "./components/pages/accounts/ContainerAccount";
import PopulationDeclaration from "./components/pages/populationDeclaration/PopulationDeclaration";
import NotFound from "./components/pages/NotFound404/NotFound";
import Profile from "./components/pages/profile/Profile";

function App() {
  return (
    <AuthContextProvider>
      <AccContextProvider>
        <CitizenContextProvider>
          <Router>
            <div className="container">
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/" element={<ProtectedRoute />}>
                  <Route exact path="home" element={<Population />} />
                  <Route path="accounts" element={<AccountList />} />
                  <Route
                    path="accounts/:accountID"
                    element={<ContainerAccount />}
                  />
                  <Route path="newAccount" element={<NewAccount />} />
                  <Route exact path="analytics" element={<Chart />} />

                  <Route path="population/:personID" element={<Individual />} />
                  <Route path="profile" element={<Profile />} />
                  <Route
                    path="declaration"
                    element={<PopulationDeclaration />}
                  />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Router>
        </CitizenContextProvider>
      </AccContextProvider>
    </AuthContextProvider>
  );
}

export default App;
