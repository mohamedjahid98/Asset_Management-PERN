import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
import { useState } from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Login from './Components/Login-Signup/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Components/Login-Signup/Signup';
import Employeeview from './Components/Employee/Employeeview';
import CreateEmp from "./Components/Employee/CreateEmp";
import UpdateEmp from "./Components/Employee/UpdateEmp";
import AssetsCatMaster from "./Components/Assets/Assets_catagory/AssetsCatMaster";
import AssetsData from "./Components/Assets/Assets_master/AssetsData";
import CreateAssets from "./Components/Assets/Assets_master/CreateAssets";
import UpdateAssets from "./Components/Assets/Assets_master/UpdateAssets";
import StockView from "./Components/Stock/StockView";
import IssueData from "./Components/Assets/Issue_Asset/IssueData";
import CreateIssue from "./Components/Assets/Issue_Asset/CreateIssue";
import ReturnData from "./Components/Assets/Return_Asset/ReturnData";
import UpdateRtnAsset from "./Components/Assets/Return_Asset/UpdateRtnAsset";
import Scrap_Asset from "./Components/Assets/Scrap_Asset/Scrap_Asset";
import AssetHistory from "./Components/Assets/Asset_history/history";
import UserProfile from "./Components/UserProfile/UserProfile";

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const isAuthenticated = () => {
    return localStorage.getItem('username') !== null;
  };

  const ProtectedRoute = ({ element }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/" />;
    }

    return element;
  };

  return (
    <div className="grid-container">
        <BrowserRouter>
            <InnerApp openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} isAuthenticated={isAuthenticated}
                ProtectedRoute={ProtectedRoute} />
        </BrowserRouter>
    </div>
);
}

function InnerApp({ openSidebarToggle, OpenSidebar, isAuthenticated, ProtectedRoute }) {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  const isSignupPage = location.pathname === '/signup';

  return (
    <Routes>
      <Route path="/" element={<>{isLoginPage && isAuthenticated() ? <Navigate to="/home" /> : <Login />}</>}></Route>
      <Route path="/signup" element={<>{isSignupPage && <Signup />}</>}></Route>
      <Route path="/home" element={<ProtectedRoute element={<><Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <Home /></>} />}></Route>
      <Route path="/employee" element={<ProtectedRoute element={<><Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <Employeeview /></>} />}></Route>
      <Route path="/employee/create" element={<ProtectedRoute element={<><Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <CreateEmp /></>} />}></Route>
      <Route path="/employee/update/:id" element={<ProtectedRoute element={<><Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <UpdateEmp /></>} />}></Route>
      <Route path="/assets-manager" element={<ProtectedRoute element={<><Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <AssetsData /></>} />}></Route>
      <Route path="/assets-manager/create" element={<ProtectedRoute element={<><Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <CreateAssets /></>} />}></Route>
      <Route path="/assets-manager/update/:id" element={<ProtectedRoute element={<><Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <UpdateAssets /></>} />}></Route>
      <Route path="/assets-cat-mas" element={<ProtectedRoute element={<><Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <AssetsCatMaster /></>} />}></Route>
      <Route path="/stock-view" element={<ProtectedRoute element={<><Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <StockView /></>} />}></Route>
      <Route path="/issue-asset" element={<ProtectedRoute element={<><Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <IssueData /></>} />}></Route>
      <Route path="/issue-asset/create" element={<ProtectedRoute element={<><Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <CreateIssue /></>} />}></Route>
      <Route path="/return-asset" element={<ProtectedRoute element={<><Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <ReturnData /></>} />}></Route>
        <Route path="/return-asset/update/:id" element={<ProtectedRoute element={<><Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <UpdateRtnAsset /></>} />}></Route>
        <Route path="/scrap-asset" element={<ProtectedRoute element={<><Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <Scrap_Asset /></>} />}></Route>
        <Route path="/asset-history" element={<ProtectedRoute element={<><Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <AssetHistory /></>} />}></Route>
        <Route path="/userprofile/:id" element={<ProtectedRoute element={<><Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <UserProfile /></>} />}></Route>
    </Routes>
  );
}

export default App;
