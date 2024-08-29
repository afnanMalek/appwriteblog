import React from 'react'
import { logout, authService } from "../index";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/");
    })
  }

  return (
    <button
      className='ml-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300'
      onClick={logoutHandler}
    >
      Logout
    </button>
  )
}

export default LogoutBtn;


