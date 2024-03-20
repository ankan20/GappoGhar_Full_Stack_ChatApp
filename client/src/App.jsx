import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import { LayoutLoader } from "./components/layout/Loaders";


const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Dashboard = lazy(()=>import('./pages/admin/Dashboard'))
const ChatManagement = lazy(()=>import('./pages/admin/ChatManagement'))
const MessageManagement = lazy(()=>import('./pages/admin/MessageManagement'))
const UserManageMent = lazy(()=>import('./pages/admin/UserManageMent'))

const AdminLogin = lazy(()=>import("./pages/admin/AdminLogin"))

let user = true;
const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback= {<LayoutLoader/>}>
      <Routes>
        <Route element={<ProtectRoute user={user} />}>
          <Route path="/" element={<Home />} />
          <Route path="/chat/:chatId" element={<Chat />} />
          <Route path="/groups" element={<Groups />} />
        </Route>
        <Route
          path="/login"
          element={
            <ProtectRoute user={!user} redirect="/">
              <Home />
            </ProtectRoute>
          }
        />
        <Route path="/admin" element={<AdminLogin/>}/>
        <Route path="/admin/dashboard" element={<Dashboard/>}/>
        <Route path="/admin/users" element={<UserManageMent/>}/>
        <Route path="/admin/chats" element={<ChatManagement/>}/>
        <Route path="/admin/messages" element={<MessageManagement/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
