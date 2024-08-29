import Header from "./Header/Header";
import Footer from "./Footer/Footer"
import { logout,login } from "../feature/authSlice";
import authService from "../appwrite/auth_service"; 
import Logo from "./Logo";
import LogoutBtn from "./Header/LogoutBtn";
import Container from "./container/Container";
import Input from "./Input";
import Button from "./Button";
import Select from "./Select";
import RTE from "./RTE";
import SignUp from "./SignUp";
import Login from "./Login"
import PostForm from "./post-form/PostForm" 
import PostCard from "./PostCard";

import AuthLayout from "./AuthLayout";

import EditPost from "../pages/EditPost";


export {Header,Footer,logout,login,authService,Logo,LogoutBtn,Container,Input,Button,Select,RTE,SignUp,Login,PostForm,PostCard,AuthLayout,EditPost} 