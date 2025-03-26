import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registeration from './component/Client/Registeration';
import Otp from './component/Client/common/Otp';
import ResendOtp from './component/Client/common/ResendOtp';
import Signin from './component/Client/Signin';
import Amount from './component/Wallet/Amount';
import Game from './component/Client/Game/Game';
import Add from './component/Wallet/WalletOperation/Add';
import Withdraw from './component/Wallet/WalletOperation/Withdraw';
import History from './component/Wallet/WalletOperation/History';
import AuthProvider from './Context/AuthContext'; // Import AuthProvider
import Dashbord from './component/Client/Dashboard';
import PrivacyPolicy from './component/Client/common/PrivacyPolicy';
import AdDashboard from './component/Admin/AdDashboard';
import UserStatus from './component/Admin/UserPage/UserStatus';
import AdminOutlet from './component/Admin/AdminOutlet';
import ClientOutlet from './component/Client/ClientOutlet';
import AddFundsForm from './component/Admin/UserPage/AddFundsForm';
import TotalCredit from './component/Admin/UserPage/TotalCredit';
import WithdrawCommand from './component/Admin/UserPage/WithdrawCommand';
import Login from './component/Admin/AdminLogin/Login';
import RecentAddRequest from './component/Admin/UserPage/RecentAddRequest';
import RecentWithdrawRequest from './component/Admin/UserPage/RecentWithdrawRequest';
import Settings from './component/Client/Setting/Settings';
import AddAccount from './component/Client/Setting/Account/AddAccount';
// import AccountDetails from './component/Client/Setting/Account/AccountDetails';
import ReferEarn from './component/Client/Setting/SettingComponent/ReferEarn';
import CustomerSupport from './component/Client/Setting/SettingComponent/CustomerSupport';

import UpdatePassword from './component/Client/Setting/SettingComponent/UpdatePassword';
import BetHistory from './component/Client/common/BetHistory';
import GameMode from './component/Admin/AdminLogin/GameMode';
import ErrorPage from './component/Client/common/ErrorPage';
import ForgotPassword from './component/Client/Setting/SettingComponent/ForgotPassword';
import ResetPassword from './component/Client/Setting/SettingComponent/ResetPassword';
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Routes with Navbar */}
          <Route element={<ClientOutlet/>}>
            <Route path="/" element={<Dashbord />} />
            <Route path="/register" element={<Registeration />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/otp-confirmation" element={<Otp />} />
            <Route path="/resend-otp" element={<ResendOtp/>} />
            <Route path="/user-wallet" element={<Amount />} />
            <Route path="/add" element={<Add />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/history" element={<History />} />
            <Route path="/bet-history" element={<BetHistory/>} />
            <Route path="/game" element={<Game />} />
            
            <Route path="/pp" element={<PrivacyPolicy />} />
            <Route path="/settings" element={<Settings/>} />
            <Route path="/add-account" element={<AddAccount/>} />
            {/* <Route path="/watch-account" element={<AccountDetails/>} /> */}
            <Route path="/refer-earn" element={<ReferEarn/>} />
            <Route path="/customer-support" element={<CustomerSupport/>} />
            
            <Route path="/update-password" element={<UpdatePassword/>} />
            <Route path  ="/forget-password" element={<ForgotPassword/>}/>
            <Route path  ="/reset-password" element={<ResetPassword/>}/>
          </Route>

          {/* Admin Routes without Navbar */}
          <Route element={<AdminOutlet/>}>
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdDashboard />} />
            <Route path="/user-status" element={<UserStatus />} />
            <Route path="/add-fund" element={<AddFundsForm/>} />
            <Route path="/add-fund-request" element={<RecentAddRequest/>} />
            <Route path="/withdraw-fund-request" element={<RecentWithdrawRequest/>} />
            <Route path="/total-credit" element={<TotalCredit/>} />
            <Route path="/withdraw-command" element={<WithdrawCommand/>} />
            <Route path="/mode" element={<GameMode/>} />
          </Route>
          
          <Route path = "/error" element = {<ErrorPage/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
