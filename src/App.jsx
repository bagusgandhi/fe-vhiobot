import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ChatPage from "./pages/ChatPage";
import Auth from "./pages/Auth";
import PrivateRoute from './utils/PrivateRoute';

function App() {
  const { auth } = useAuth();

  return (
    <div className='mx-auto bg-indigo-900 h-screen'>
      <Router>
        <Routes>
          <Route element={<PrivateRoute auth={auth}/>}>
            <Route element={<ChatPage />} path='/' exact />
          </Route>
          <Route path='/auth' element={<Auth />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
