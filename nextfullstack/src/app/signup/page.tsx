'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast, { Toaster} from 'react-hot-toast';
import React, { useEffect, useState } from 'react';

export default function SignupPage() {

  const [user, setUser] = useState({
    email:"", username:"", password:""
  });

  const router = useRouter();

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
      setButtonDisabled(false);
    }
    else if(user.email.length <= 0 || user.password.length <= 0 || user.username.length <= 0){
      setButtonDisabled(true);
    }
  },[user]);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup",user);
      console.log("SignUp success", response.data);
      router.push("/login");
    } catch (error:any) {
      console.log("Signup failed");
      toast.error(error.message);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <div className=' flex flex-col border-solid border-white border-2 p-6 rounded-lg'>
      <h1 className='text-4xl  pb-2 tracking-wide text-stone-400'>{loading ? "Processing" : "Sign Up"}</h1>
      <hr className=' pb-4 ' />

      <label htmlFor="username">Username</label>
      <input
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        id='username' 
        value={user.username} 
        type='text' 
        onChange={(e)=>{return setUser({...user, username: e.target.value})}} 
        placeholder='username'/>

      <label htmlFor="email">Email ID</label>
      <input
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        id='email' 
        value={user.email} 
        type='email' 
        onChange={(e)=>{return setUser({...user, email: e.target.value})}} 
        placeholder='email'/>

      <label htmlFor="password">Password</label>
      <input
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        id='password' 
        value={user.password} 
        type='password' 
        onChange={(e)=>{return setUser({...user, password: e.target.value})}} 
        placeholder='password'/>

      <button className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 hover:bg-gray-700' onClick={onSignUp} disabled={loading || buttonDisabled}>
        {buttonDisabled ? "Please fill the details" : "Click to SignUp"}
      </button>

      <Link href="/login" className='text-center hover:text-gray-400'>Visit Login Page</Link>
      </div>
      <Toaster/>
    </div>
  )
}