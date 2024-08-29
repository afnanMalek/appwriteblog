import { useEffect, useState } from 'react';
import './App.css';
import authService from './appwrite/auth_service';
import { useDispatch } from "react-redux";
import { login, logout } from './feature/authSlice';
import { Footer, Header } from './components/index';
import { Outlet } from 'react-router-dom';

function App() {
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then(userData => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoader(false));
  }, [dispatch]);

  return !loader ? (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto p-4">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  ) : null;
}

export default App;

